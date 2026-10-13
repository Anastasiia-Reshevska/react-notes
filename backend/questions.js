import express from "express";
import { pool } from "./db.js";
import { isValidBody } from "./validation.js";

const router = express.Router();

const columns = `id, question, answer, description, resources, level, completed,
  TO_CHAR(edit_date, 'DD.MM.YYYY, HH24:MI') AS "editDate"`;

const sortColumns = {
  level: "level ASC, id ASC",
  "-level": "level DESC, id ASC",
  completed: "completed ASC, id ASC",
  "-completed": "completed DESC, id ASC",
};

const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res)).catch(next);
};

router.param("id", (req, res, next, id) => {
  const number = Number(id);
  if (!/^\d+$/.test(id) || number < 1 || number > 2147483647) {
    return res.status(400).json({ message: "Invalid id" });
  }
  next();
});

router.get(
  "/",
  asyncRoute(async (req, res) => {
    const page = Number(req.query._page ?? 1);
    const perPage = Number(req.query._per_page ?? 10);
    const sort = req.query._sort;

    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      !Number.isSafeInteger(perPage) ||
      perPage < 1 ||
      perPage > 100
    ) {
      return res.status(400).json({ message: "Invalid pagination" });
    }
    if (sort !== undefined && !Object.hasOwn(sortColumns, sort)) {
      return res.status(400).json({ message: "Invalid sort" });
    }

    const count = await pool.query(
      "SELECT COUNT(*)::int AS total FROM questions",
    );
    const total = count.rows[0].total;
    const pages = Math.max(1, Math.ceil(total / perPage));
    const result = await pool.query(
      `SELECT ${columns} FROM questions ORDER BY ${sortColumns[sort] ?? "id ASC"} LIMIT $1 OFFSET $2`,
      [perPage, (page - 1) * perPage],
    );

    res.json({
      first: 1,
      prev: page > 1 ? page - 1 : null,
      next: page < pages ? page + 1 : null,
      last: pages,
      pages,
      items: total,
      data: result.rows,
    });
  }),
);

router.get(
  "/:id",
  asyncRoute(async (req, res) => {
    const result = await pool.query(
      `SELECT ${columns} FROM questions WHERE id = $1`,
      [req.params.id],
    );
    if (!result.rows.length) return res.sendStatus(404);
    res.json(result.rows[0]);
  }),
);

router.post(
  "/",
  asyncRoute(async (req, res) => {
    const fields = [
      "question",
      "answer",
      "description",
      "resources",
      "level",
      "completed",
    ];
    if (!isValidBody(req.body, fields)) {
      return res.status(400).json({ message: "Invalid question" });
    }

    const result = await pool.query(
      `INSERT INTO questions (${fields.join(", ")})
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${columns}`,
      fields.map((field) => req.body[field]),
    );
    res.status(201).json(result.rows[0]);
  }),
);

router.patch(
  "/:id",
  asyncRoute(async (req, res) => {
    if (!isValidBody(req.body, [])) {
      return res.status(400).json({ message: "Invalid question" });
    }

    const entries = Object.entries(req.body);
    const assignments = entries.map(([field], index) => {
      const column = field === "editDate" ? "edit_date" : field;
      return field === "editDate"
        ? `${column} = TO_TIMESTAMP($${index + 1}, 'DD.MM.YYYY, HH24:MI')`
        : `${column} = $${index + 1}`;
    });
    const values = entries.map(([, value]) => value);
    const result = await pool.query(
      `UPDATE questions SET ${assignments.join(", ")}
     WHERE id = $${values.length + 1} RETURNING ${columns}`,
      [...values, req.params.id],
    );
    if (!result.rows.length) return res.sendStatus(404);
    res.json(result.rows[0]);
  }),
);

router.delete(
  "/:id",
  asyncRoute(async (req, res) => {
    const result = await pool.query(
      "DELETE FROM questions WHERE id = $1 RETURNING id",
      [req.params.id],
    );
    if (!result.rows.length) return res.sendStatus(404);
    res.json(result.rows[0]);
  }),
);

export { router as questionsRouter };

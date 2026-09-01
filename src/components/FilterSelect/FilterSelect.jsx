import cls from './FilterSelect.module.scss';

export const FilterSelect = ({
  value,
  onChange,
  valueCount,
  onChangeCount,
}) => {
  return (
    <>
      <select value={value} onChange={onChange} className={cls.select}>
        <option value="">sort by</option>

        <optgroup label="Level">
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
        </optgroup>

        <optgroup label="Completed">
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">completed DESC</option>
        </optgroup>
      </select>

      <select
        value={valueCount}
        onChange={onChangeCount}
        className={cls.select}
      >
        <option disabled>count</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </>
  );
};

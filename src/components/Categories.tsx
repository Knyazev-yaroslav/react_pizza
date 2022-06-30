import React, { FC } from "react";

type TCategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: FC<TCategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={`${index}_${categoryName}`}
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

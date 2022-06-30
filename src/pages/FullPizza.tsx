import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://62af2c613bbf46a3521d76a8.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    };
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="imageUrl" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} P</h4>
    </div>
  );
};

export default FullPizza;

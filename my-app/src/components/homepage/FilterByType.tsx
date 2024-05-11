import React, { useState, useEffect } from "react";
import getTypes, { Types } from "../../api/getTypes";
import "../../css/homepage.css";

const FilterByType: React.FC<{
  typeFilters: string[];
  setTypeFilters: Function;
}> = ({ typeFilters, setTypeFilters }) => {
  const [types, setTypes] = useState<Types[] | undefined>(undefined);

  useEffect(() => {
    const fetchTypes = async () => {
      const pokemonTypes = await getTypes();
      setTypes(pokemonTypes);
    };
    fetchTypes();
  }, []);

  const handleTypeClick = (typeName: string) => {
    setTypeFilters((prevTypeFilters: string[]) => {
      if (prevTypeFilters.includes(typeName)) {
        return prevTypeFilters.filter((type) => type !== typeName);
      } else {
        return [...prevTypeFilters, typeName];
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        justifyContent: "center",
        height: "50px",
      }}
    >
      {types &&
        types.map((type: Types, id) => {
          return (
            <img
              key={id}
              className="types"
              src={type.image}
              alt={"type"}
              style={{
                border: typeFilters.includes(type.name)
                  ? "solid 2px #f6c908"
                  : "",
              }}
              onClick={() => handleTypeClick(type.name)}
            />
          );
        })}
    </div>
  );
};

export default FilterByType;

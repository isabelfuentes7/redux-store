import React, { useEffect } from 'react';
import { update_Categorys, update_Current_Category } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from '../../utils/helpers';


function CategoryMenu({}) {
  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();

  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: update_Categorys,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      console.log("I am offline")
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: update_Categorys,
          categories: categories
        });
      });

    }
  }, [loading, categoryData, dispatch]);

  const handleClick = id => {
    dispatch({
      type: update_Current_Category,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

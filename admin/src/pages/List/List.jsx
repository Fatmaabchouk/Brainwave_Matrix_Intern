import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data); // Vérifiez la structure de la réponse
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error(error);
    }
  };
  const removeFood = async (foodId) =>{
    console.log(foodId);
    const response = await axios.post (`${url}/api/food/remove ` , {id:foodId })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)

    }
    else{
      toast.error("Eroor");
    }


    

  }





  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Images</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          // Extraire seulement le nom de l'image à partir de l'URL
          const imageUrl = item.image.startsWith("http") ? item.image : `${url}/images/${item.image}`;
          
          return (
            <div key={index} className='list-table-format'>
              <img
                src={imageUrl}
                alt={item.name}
                onError={(e) => { e.target.src = 'path-to-default-image.jpg'; }} // Image par défaut
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)} >X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;

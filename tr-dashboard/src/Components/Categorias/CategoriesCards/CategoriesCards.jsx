import React, { useEffect, useState } from 'react'; 
import "./CategoriesCards.css";

const CategoriesCards=()=>{
    const [categories, setCategories] = useState([]);

    const getCategories = async()=>{
        try {
            const result = await fetch("http://localhost:3001/api/product")
            const categoriesJson = await result.json();
            setCategories(categoriesJson.countByCategory);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategories();
    }, []);
    
    return <div className="categories-cards">
            {/* tarjetas categorias con total productos */}
            {categories.map((category, i) => (
                    
                    <div className="card">
                        <div className='line'></div>
                        <div className='categoy-content'>
                            <p className='category-name' key={i}>{category.productCategoryName}</p>
                            <p className='category-amount'><span>{category.quantity}</span></p>
                        </div>
                    </div>  
                ))
                }
    </div>
        
}

export default CategoriesCards; 

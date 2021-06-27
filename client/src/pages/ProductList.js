import React, {useEffect} from 'react';
import AdminHeader from '../Components/AdminHeader';
import AdminSidebar from '../Components/AdminSidebar';
import './../styles/productlist.css';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from './../actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.getAllProducts);
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className='dashboard'>
      <div className="dashboard__left">
        <AdminSidebar />
      </div>
      <div className="dashboard__right">
        <AdminHeader />
        <div className="dashboard__rightContent">
          <h2>Product List</h2>
          <div className="productList">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((prod, i) => (
                    <tr key={prod._id}>
                      <td>{i+1}</td>
                      <td>{prod.title}</td>
                      <td>IDR {prod.price}</td>
                      <td>
                        <button>UPDATE</button>
                        <button>DELETE</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList;
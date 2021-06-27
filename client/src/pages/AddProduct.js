import React, { useState, useEffect } from 'react';
import './../styles/addproduct.css';
import AdminHeader from '../Components/AdminHeader';
import AdminSidebar from '../Components/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { addProduct, clearErrors } from './../actions/productActions';

const AddProduct = () => {
  const { loading, error } = useSelector(state => state.product);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [productImage, setProductImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addProduct({ title, stock, price, productImage }));
    alert.success('Product inserted');
  }

  const handleChange = e => {
    const files = Array.from(e.target.files);
    setImagePreview([]);
    setProductImage([]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {   // 0 = fail, 1 = loading, 2 = success     === comparation
          setImagePreview(oldArray => [...oldArray, reader.result]);
          setProductImage(oldArray => [...oldArray, reader.result]);
        }
      }
      reader.readAsDataURL(file);  // baca data sebagai url, bukan sebagai path dan dikirim backend
    })
  }

  return (
    <div className='dashboard'>
      <div className="dashboard__left">
        <AdminSidebar />
      </div>
      <div className="dashboard__right">
        <AdminHeader />
        <div className="dashboard__rightContent">
          <h2>Add Product</h2>
          <div className="addProduct">
            <form onSubmit={handleSubmit} encType='multipart/form-data'>   {/* encType buat manghandle upload (input type file) */}
              <div className="inputGroup">
                <label htmlFor="productName">Product Name</label>
                <input type="text" id="productName" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="inputGroup">
                <label htmlFor="productPrice">Product Price</label>
                <input type="number" id="productPrice" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <div className="inputGroup">
                <label htmlFor="productStock">Product Stock</label>
                <input type="number" id="productStock" value={stock} onChange={e => setStock(e.target.value)} />
              </div>
              <div className="inputGroup">
                <label htmlFor="productImage">Product Image</label>
                <input type="file" id="productImage" multiple accept="image/*" onChange={handleChange} />
              </div>
              {
                imagePreview && (  //&& kalau true dia jalanin semua yang ada di kurung
                  imagePreview.map(preview => (
                    <img src={preview} alt="Product" width='80' style={{ border: '1px solid black', marginRight: '20px' }} />
                  ))
                )
              }
              <br />
              <button type="submit" disabled={loading ? true : false}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AddProduct;
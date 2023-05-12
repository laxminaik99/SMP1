import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { Divider, message } from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import moment from "moment";


function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // React.useEffect(() => {
  //   getData();
  // }, []);

  useEffect(()=>{
    getData();
  },[filters]
  );

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            placeholder="search product here..."
         
            className="border border-gray-300 rounded border-solid px-2 py-1 h-14"
          ></input>
        </div>
        <div
          className={`
      grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}`}
        >
          {products?.map((product) => {
            return (
              <div
                className="border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  className="w-full h-52 p-5 rounded-md object-cover"
                  alt=""
                />

                <div className="px-2 flex flex-col">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm text-gray-500">{product.age}{' '}
                  {product.age === 1 ? "year":"years"}{' '}
                  old
                  </p>
          
                  <Divider />
                  <span className="text-lg font-semibold text-green-500">
                    ${product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;

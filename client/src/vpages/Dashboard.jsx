import { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import Product from '../components/Product';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import Loading from '../pages/Loading';


export default function Dashboard() {

  const navigate = useNavigate();
  const {currentSeller} = useSelector(state => state.seller);

  const[loading, setLoading] = useState(false);
  const[listing, setListing] = useState([]);
  const[showMore, setShowMore] = useState(false);
  const[del,setDel]=useState(false);

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    sort:  'created_at',
    order: 'desc'
  })

  useEffect( ()=> {
    const urlParams = new URLSearchParams(location.search);
    // console.log(urlParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if(searchTermFromUrl || sortFromUrl || orderFromUrl){
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      })
    }

    const fetchListing = async ()=> {
      setLoading(true);
      try{
        const searchQuery = urlParams.toString();
        const res = await fetch(`api/listing/${currentSeller._id}/?${searchQuery}`);
        const data = await res.json();
        console.log(data);
        setListing(data);
        if(data.length > 8){
          setShowMore(true);
        }
        else{
          setShowMore(false);
        }

      }
      catch(e){
        console.log(e);
      }
      setLoading(false);
    }

    fetchListing();

  },[location.search,del])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);

    // const searchQuery = urlParams.toString();


    try{
      const searchQuery = urlParams.toString();
      const res = await fetch(`api/listing/${currentSeller._id}/?${searchQuery}`);
      const data = await res.json();
      console.log(data);
      setListing(data);
      if(data.length > 8){
        setShowMore(true);
      }
      else{
        setShowMore(false);
      }

    }
    catch(e){
      console.log(e);
    }

  }



  const handleChange = (e) => {
    e.preventDefault();

    if(e.target.id === 'searchTerm'){
      setSidebardata({...sidebardata, searchTerm: e.target.value});
    }

    if(e.target.id === 'sort_order'){
      const sort = e.target.value.split('_')[0] || 'created_At';
      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({...sidebardata, sort, order });
    }

  }
  const handleExport=()=>{
    const data=listing;
    for(let i=0;i<data.length;i++){
      const resultString=data[i].images.join(', ');
      data[i].images=resultString;
    }
    exportToExcel(data,'catalogs');
  }
  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          XLSX.writeFile(wb, filename + ".xlsx");
  };

  return (
    <div className='w-full flex justify-end'>
      <div className='rounded-lg w-3/4'>
      <div className='w-full flex justify-between items-end border-b-2'>
        <div className='w-fit h-fit mb-2 ml-4 cursor-pointer'>
         <Link to={"/create"}><div className='w-fit h-fit rounded-full bg-blue-500 text-white px-4 py-4 flex items-center justify-center text-2xl gap-4'>
              Create New <IoMdAddCircle />
          </div></Link>
          
        </div>
          <form onSubmit={handleSubmit} className='w-fit h-44 p-4 justify-end items-end flex flex-row gap-8'>

            <div className="flex items-center">
              <input onChange={handleChange} value={sidebardata.searchTerm} type="text" id='searchTerm' placeholder='Search...' className='border rounded-l-lg p-3 w-96 text-xl'/>
              <button className='bg-blue-500 text-white p-3 px-4 text-xl rounded-r-lg'>Search</button>
            </div>

            <div className="flex items-center gap-2">
              <label className='font-semibold text-xl'>Sort:</label>
              <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border rounded-lg text-xl p-3'>
                <option value="price_desc">Price high to low</option>
                <option value="price_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
          </form>
        </div>
        <div className='w-full h-fit flex p-4 justify-between items-center'>
          <h1 className='text-3xl font-semibold p-3 text-slate-700 mt-5' >Cataloges: </h1>
          <div className='w-fit h-fit cursor-pointer rounded-full bg-blue-500 text-white px-4 py-2 flex items-center justify-center text-2xl gap-4' onClick={handleExport}>Export</div>
        </div>
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && listing.length == 0 && (
              <p className='text-xl text-slate-700'>No listing found!</p>
            )}
            {loading && (
              <div className='w-full h-fit flex justify-center items-end'><Loading/></div>
            )}
            {
              !loading && listing.map((listing) => (
                <Product key={listing._id} listing={listing} setDel={setDel} />
              ))
            }
            {/* {showMore && (
              <button onClick={onShowMoreClick} className='text-green-700 hover:underline p-7 text-center w-full'> Show More</button>
            )} */}
          </div>
          
        </div>


      </div>
  )
}

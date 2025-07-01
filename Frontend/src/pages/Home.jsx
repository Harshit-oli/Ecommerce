  import Hero from '../components/Layout/Hero'
  import GenderCollectionSection from '../components/Products/GenderCollectionSection'
  import NewArrivals from '../components/Products/NewArrivals'
  import ProductsDetails from '../components/Products/ProductsDetails'
  import ProductGrid from '../components/Products/ProductGrid'
  import FeatureCollection from '../components/Products/FeatureCollection'
  import FeaturesSection from "../components/Products/FeaturesSection"



  const placeholderProducts=[
    {
      _id:1,
      name:"Product 1",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=2"}],
    },
     {
      _id:3,
      name:"Product 2",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=3"}],
    },
     {
      _id:5,
      name:"Product 3",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=5"}],
    },
     {
      _id:7,
      name:"Product 4",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=7"}],
    },
    {
      _id:9,
      name:"Product 5",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=9"}],
    },
     {
      _id:2,
      name:"Product 6",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=2"}],
    },
     {
      _id:6,
      name:"Product 7",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=6"}],
    },
     {
      _id:8,
      name:"Product 8",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=8"}],
    },
  ]

  const Home = () => {

    return (
      <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductsDetails/>

        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wears For Women</h2>
          <ProductGrid products={placeholderProducts}/>
        </div>
        <FeatureCollection/>
        <FeaturesSection/>
      </div>
    )
  }

  export default Home

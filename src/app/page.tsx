'use client'
import Header from "@/components/Header";
import { CategoryContextProvider } from "@/context/CategoryContext";
import { ProductContextProvider } from "@/context/ProductContext";
import { useContext } from "react";
import 'swiper/swiper-bundle.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Loading from '@/components/Loading'
import LandingPage from "@/components/Home/LandingPage";
import MostPop from "@/components/Home/MostPop";
import TopCategories from "@/components/Home/TopCategories";
import NewItems from "@/components/Home/NewItems";
import Brands from "@/components/Brands";
import Footer from "@/components/Footer";



const page = () => {
  const categoryContext = useContext(CategoryContextProvider)
  const productContext = useContext(ProductContextProvider)
  const authSettings = useContext(AuthContextProvider)


  if (categoryContext?.categories?.length == 0 || productContext?.products?.length == 0) {
    return (
      <Loading />
    )
  }


  return (
    <div>
      <Header />

      <LandingPage />

      <br />

      <MostPop authSettings={authSettings} />

      <br />
      <br />
      <br />



      <div className="bg-[url(/bg-2.jpg)] bg-cover bg-fixed bg-no-repeat h-[300px] w-full bg-bottom">
        <div className="flex flex-col gap-3 justify-center h-full">
          {
            localStorage?.getItem('dir') == 'ar' ? (
              <h3 className="inner_text_shadow white-orange-text text-3xl text-center">
                أكتشف <span className="underline-offset-8 underline from-sky-100 to-blue-200 bg-gradient-to-l bg-clip-text text-transparent">هوديهات جديدة</span>, <span className="underline-offset-8 underline from-red-100 to-yellow-100 bg-gradient-to-l bg-clip-text text-transparent">عالية الجودة</span>, <span className="underline-offset-8 underline from-blue-300 to-red-100 bg-gradient-to-l bg-clip-text text-transparent">والافضل مبيعا</span>
              </h3>

            ) :
              <h3 className="inner_text_shadow white-orange-text text-3xl text-center">
                Discover <span className="underline-offset-8 underline from-sky-100 to-blue-200 bg-gradient-to-l bg-clip-text text-transparent">New</span>, <span className="underline-offset-8 underline from-red-100 to-yellow-100 bg-gradient-to-l bg-clip-text text-transparent">High Quality</span>, <span className="underline-offset-8 underline from-blue-300 to-red-100 bg-gradient-to-l bg-clip-text text-transparent">Best Selling</span> Hodies
              </h3>
          }
          <div className="flex gap-1 inner_text_shadow text-white p-1 border rounded-md w-fit cursor-pointer mx-auto
          transition-all
          hover:border-orange-300 hover:px-5
          ">
            {
              localStorage?.getItem('dir') == 'ar' ? (
                <strong className="my-auto inner_text_shadow">قسم الهوديهات</strong>
              )
                :
                <strong className="my-auto inner_text_shadow">Hodies Section</strong>
            }
            <span className="my-auto text-xl inner_text_shadow">
              {'>'}
            </span>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />



      <TopCategories authSettings={authSettings} />

      <br />
      <br />
      <br />

      <NewItems authSettings={authSettings} />

      <br />
      <br />
      <br />


      <Brands />

      <br />
      <br />
      <br />

      <Footer />

    </div>
  );
};

export default page;

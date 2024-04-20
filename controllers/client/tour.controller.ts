import { Request,Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

//[GET] /tours
export const index= async (req:Request,res:Response) =>{
  try {
    const tour=await Tour.findAll({
      attributes:["title"],
      group:["title"],
      where:{
        deleted:false,
        status:"active"
      },
      raw:true,
    });
    res.render("client/pages/tours/index",{
      pageTitle:"Danh sách tours",
      tour:tour
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

//[GET] /tours/:slugCategory
export const detailCategory= async (req:Request,res:Response) =>{
  try {
    const slugCategory:String=req.params.slugCategory;
    const tours=await sequelize.query(`
      SELECT tours.*
      FROM tours
      JOIN tours_categories ON tours.id=tours_categories.tour_id
      JOIN categories ON tours_categories.category_id=categories.id
      WHERE 
        categories.slug="${slugCategory}"
        AND categories.deleted=false
        AND tours.deleted=false
        AND categories.status="active"
        AND tours.status="active";
    `,{
      type:QueryTypes.SELECT,
      raw:true
    });
    for (const tour of tours) {
      if(tour["images"]){
        const images=JSON.parse(tour["images"]);
        tour["images"]=images[0];
      };
      tour["price_special"]=tour["price"]*(1-tour["discount"]/100);
    }
    res.render("client/pages/tours/detailCategory",{
      pageTitle:"Danh mục tours",
      tours:tours
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

//[GET] /tours/detail/:slugTour
export const detailTour= async (req:Request,res:Response) =>{
  try {
    const slugTour=req.params.slugTour;

    const tour=await Tour.findOne({
      where:{
        slug:slugTour,
        deleted:false,
        status:"active"
      },
      raw:true,
    });
    if(tour["images"]){
      tour["images"]=JSON.parse(tour["images"]);
    }
    tour["price_special"]=tour["price"]*(1-tour["discount"]/100);
    res.render("client/pages/tours/detailTour",{
      pageTitle:"Chi tiết tours",
      tourDetail:tour
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
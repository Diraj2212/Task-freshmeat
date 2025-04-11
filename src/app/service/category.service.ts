import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  
  addcategories(data:any){
    return this.http.post<any>(AppSetting.ADMIN_ENDPOINT+'addCategories',data);
  }
  getcategories(){
    return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+'categoriesList');
  }

categoriesdelete(categoriesId:any){
 return this.http.delete(AppSetting.ADMIN_ENDPOINT+'deleteCategories/' + categoriesId);
}


getCategoriesByCategoriesTypeId(categoriesTypeId:any){
  return this.http.get(AppSetting.ADMIN_ENDPOINT+'CategoriesList/CategoriesTypeId/'+categoriesTypeId)
}
updateCategoriesDetail(url:any, data:any){
  return this.http.put(url, data)
  
}
addcategoriestype(data:any){
  return this.http.post<any>(AppSetting.ADMIN_ENDPOINT+'AddCategoriesType',data);
}
getcategoriesType(){
  return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+'categoriesTypeList');
}
categoriestypedelete(catoriesegTypeId:any){
  return this.http.delete(AppSetting.ADMIN_ENDPOINT+'deleteCity/' + catoriesegTypeId);
}
updateCategoriesTypeDetail(url:any, data:any){
  return this.http.put(url, data)
 
}
addcategoriess(data:any){
  return this.http.post<any>(AppSetting.ADMIN_ENDPOINT+'subCategories',data);
   }
   getcategoriess(){
     return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+'subCategoriesList');
   }
}

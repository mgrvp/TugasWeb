import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';

@Injectable()
export class DataStorageService{
    constructor(private http: Http, private recipeService: RecipeService){}

    storeRecipe(){
        return this.http.put('https://database-26e3b.firebaseio.com/recipes.json',
        this.recipeService.getRecipes());
    }

    getRecipes(){
        this.http.get('https://database-26e3b.firebaseio.com/recipes.json')
        .subscribe(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}

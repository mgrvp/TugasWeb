import { Injectable,EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private slsService:ShoppingListService) {}

  recipes:Recipe[]=[
    new Recipe('Kereta',
    'Transportasi Darat Tanpa Macet',
    'https://www.kaorinusantara.or.id/wp-content/uploads/2015/07/IMG_9731-Copy.jpg',
    [
      new Ingredient('Dewasa', 1),
      new Ingredient('Anak-anak', 2)
    ]),
    new Recipe('Pesawat',
    'Transportasi Cepat dan nyaman',
    'https://landor-prod.imgix.net/app/uploads/2015/08/28210432/Garuda-e1441140636876.jpg?w=1160&h=653&f=crop&auto=format', [
      new Ingredient('Bisnis', 1),
      new Ingredient('Ekonomi', 3),
    ]),
    new Recipe('Kapal Laut',
    'Transportasi Santai kayak di pantai',
    'https://joss.co.id/data/uploads/2018/05/kapal-laut.jpg', [
      new Ingredient('VIP', 1),
      new Ingredient('Ekonomi', 3),
    ]),
    ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }
  addIngredientsShoppingList(ingredients: Ingredient[]){
    this.slsService.addIngredients(ingredients);
  }
  getRecipe(index:number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

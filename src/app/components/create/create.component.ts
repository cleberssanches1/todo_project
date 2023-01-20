import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  listFinished: Todo[] = [];

  todo: Todo = {
    titulo: "",
    descricao: "",
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  constructor(private service: TodoService, private router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate([""]);
  }

  create(): void {
   // this.formataData();
    console.log(this.todo.dataParaFinalizar);

    this.service.create(this.todo).subscribe(
      (resposta)=> {
        this.service.message('Todo criado com sucusso!');
        this.router.navigate([''])
      },err =>{
        this.service.message('Falha ao criar Todo!');
        this.router.navigate([''])
      }
    )

  }

  // formataData(): void {
  //   let data = new Date(this.todo.dataParaFinalizar);
  //   this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  // }
}

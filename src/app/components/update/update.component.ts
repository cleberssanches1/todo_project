import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  listFinished: Todo[] = [];

  todo: Todo = {
    titulo: "",
    descricao: "",
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  constructor(
    private service: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  cancel(): void {
    this.router.navigate([""]);
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((resposta) => {
      console.log(resposta);
      this.todo = resposta;
    });
  }

  update(): void {
    //this.formataData();
    console.log(this.todo.dataParaFinalizar);

    this.service.update(this.todo).subscribe(
      (resposta) => {
        this.service.message("Todo atualizado com sucusso!");
        this.router.navigate([""]);
      },
      error => {
        this.service.message("Falha ao atualizar Todo!");
        this.router.navigate([""]);
      }
    );
  }

  // formataData(): void {
  //   let data = new Date(this.todo.dataParaFinalizar);
  //   this.todo.dataParaFinalizar = `${data.getDate()}/${
  //     data.getMonth() + 1
  //   }/${data.getFullYear()}`;
  // }
}

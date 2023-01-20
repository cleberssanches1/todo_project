import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-read-all",
  templateUrl: "./read-all.component.html",
  styleUrls: ["./read-all.component.css"],
})
export class ReadAllComponent implements OnInit {
  closed = 0;
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) {}

  list: Todo[] = [
    //  {
    //    titulo: "Teste",
    //    dataParaFinalizar: new Date,
    //    finalizado: false
    //  },
    //  {
    //   titulo: "Teste 2",
    //   dataParaFinalizar: new Date,
    //   finalizado: false
    // }
  ];

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.listFinished = [];
    this.list = [];
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
          this.closed++;
        } else {
          this.list.push(todo);
        }
      });
      this.closed = this.listFinished.length;
    });
  }

  countClosed(): void {
    for (let todo of this.list) {
      if (todo.finalizado) {
        this.closed++;
      }
    }
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message("Tarefa excluída com sucesso!");
        this.findAll();
      } else {
      }
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(["finalizados"]);
  }

  finalizar(item: Todo): void {
    item.finalizado = true;
    this.service.update(item).subscribe((resposta) => {
      this.service.message("Tarefa atualizada com sucesso!");
      this.closed++;
      this.findAll();
    });
  }
}

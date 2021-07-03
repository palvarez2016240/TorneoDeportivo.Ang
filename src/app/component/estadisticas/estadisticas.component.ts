import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Equipo } from 'src/app/model/equipo.model';
import { EquipoService } from 'src/app/service/equipo.service';
import { GLOBAL } from 'src/app/service/global.service';
import { LigasService } from 'src/app/service/ligas.service';
import { SubirImageService } from 'src/app/service/subirimagen.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  providers: [EquipoService, LigasService]

})
export class EstadisticasComponent implements OnInit {
  idLiga
  Ganador
  public url;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['GOLES POR EQUIPOS'];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public x = 1
  public y = 2



  constructor(
    public _ligasService: LigasService,
    public _EquipoService: EquipoService,
    public _activatedRoute: ActivatedRoute,


  ){     this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute) => {
      this.idLiga = dataRoute.get('idLiga');
    });

    this.colorRGB()
    this.CrearGraficaTopgOLES()




  }
  public nombre = [{ }]

  public barChartData: ChartDataSets[] = this.nombre;

  public Nombre =[]
  public Numero =[]
  public Colores =[]

  public pieChartLabels: Label[] = this.Nombre;
  public pieChartData: number[] = this.Numero;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };


  public pieChartColors = [
    {
      backgroundColor: this.Colores,
    },
  ];


  CrearGraficaTopgOLES(){


    this._EquipoService.tabla(this.idLiga).subscribe(
      reponse=>{


  console.log(reponse.tablaDeEquipos)
  var necesito = reponse.tablaDeEquipos
   this.Ganador = reponse.tablaDeEquipos[0]

  console.log(this.Ganador)



   for (var i = 0; i < necesito.length; i++) {
    this.nombre[i]= { data: [necesito[i].pts, necesito[i].pts], label: necesito[i].nombres}
  }


       }

    )
    }


  //colores


 generarLetra(){
	var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var numero = (Math.random()*15).toFixed(0);
	return letras[numero];
}

 colorHEX(){
	var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + this.generarLetra() ;
	}
	return "#" + coolor;
}

 generarNumero(numero){
	return (Math.random()*numero).toFixed(0);
}

 colorRGB(){
	var coolor = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) + "," + 0.3 +")";
  var color = "rgb"+ coolor;
  console.log(color);
	return "rgb" + coolor;
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}



}

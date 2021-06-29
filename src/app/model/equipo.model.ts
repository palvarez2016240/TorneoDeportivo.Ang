export class Equipo{
  constructor(
    public _id:String,
    public nombres: String,
    public golesAfavor: Number,
    public golesEncontra: Number,
    public diferenciaGoles: Number,
    public partidosJugados: Number,
    public pts: Number,
    public imagen: String,
    public usuario: String,
    public liga: String,
  ){}
}

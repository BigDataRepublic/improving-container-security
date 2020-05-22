export class PredictionData {

  constructor(
    public inputValue1: number,
    public inputValue2: number,
    public outputValue: number
  ) {  }

  requestData() {
    return [
      [this.inputValue1, this.inputValue2]
    ]
  }
}

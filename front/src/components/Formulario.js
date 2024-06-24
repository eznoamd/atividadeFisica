import '../css/Formulario.css';
import React,{Component} from 'react';
import axios from 'axios';

export class Formulario extends Component{
    constructor() {
        super();
        this.state = {
            pression : '',
            volume : '',
            temperature : '',
            nothing : 'true',

            respo: '',

            form:{
                pressaoInit:"0",
                volumeInit:"0",
                temperaturaInit:"0",
                pressao:"0",
                volume:"0",
                temperatura:"0",

                tipo:"N"
            },
        }


        this.changeTemperature = this.changeTemperature.bind(this)
        this.changeVolume = this.changeVolume.bind(this)
        this.changePression = this.changePression.bind(this)
        this.changeNothing = this.changeNothing.bind(this)

        this.calcular = this.calcular.bind(this)

        this.formPressao = this.formPressao.bind(this)
        this.formPressaoInit = this.formPressaoInit.bind(this)
        this.formTemperatura = this.formTemperatura.bind(this)
        this.formTemperaturaInit = this.formTemperaturaInit.bind(this)
        this.formVolume = this.formVolume.bind(this)
        this.formVolumeInit = this.formVolumeInit.bind(this)
    }

    changeTemperature(event){
        this.setState({pression : '',volume : '',temperature : 'true',nothing : ''})
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:event.target.value
            }
        })
    }
    changeVolume(event){
        this.setState({pression : '',volume : 'true',temperature : '',nothing : ''})
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:event.target.value
            }
        })
    }
    changePression(event){
        this.setState({pression : 'true',volume : '',temperature : '',nothing : ''})
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:event.target.value
            }
        })
    }
    changeNothing(event){
        this.setState({pression : '',volume : '',temperature : '',nothing : 'true'})
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:event.target.value
            }
        })
    }

    formPressao(event){
        if(event.target.value == ''){
            event.target.value = "0"
        }
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:event.target.value,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:this.state.form.type
            }
        })
    }
    formPressaoInit(event){
        if(event.target.value == ''){
            event.target.value = "0"
        }
        this.setState({
            form:{
                pressaoInit:event.target.value,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:this.state.form.type
            }
        })
    }
    formTemperatura(event){
        if(event.target.value == ''){
            event.target.value = "0"
        }
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:event.target.value,

                tipo:this.state.form.type
            }
        })
    }
    formTemperaturaInit(event){
        if(event.target.value == ''){
            event.target.value = "0"
        }
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:event.target.value,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:this.state.form.type
            }
        })
    }
    formVolume(event){
        if(event.target.value == ''){
            event.target.value = "0"
        }
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:this.state.form.volumeInit,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:event.target.value,
                temperatura:this.state.form.temperatura,

                tipo:this.state.form.type
            }
        })
    }
    formVolumeInit(event){
        if(event.target.value == ''){
            event.target.value = "0"
        }
        this.setState({
            form:{
                pressaoInit:this.state.form.pressaoInit,
                volumeInit:event.target.value,
                temperaturaInit:this.state.form.temperaturaInit,
                pressao:this.state.form.pressao,
                volume:this.state.form.volume,
                temperatura:this.state.form.temperatura,

                tipo:this.state.form.type
            }
        })
    }

    calcular = async (event)=>{
        event.preventDefault();
        let data = this.state.form;
        console.log(data)
        return axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/calc',
            data: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((res)=>{
            this.setState({respo:res.data})
        })
    }

    render(){
        return(
            <form className="Formulario" onSubmit={this.calcular}>
                <label>Formulario da calculadora PVT:</label><br></br>
                <div className="sec">
                    <input type="number" name="Po" placeholder="Pressão inicial" disabled={this.state.pression} onChange={this.formPressaoInit}/>
                    <input type="number" name="P" placeholder="Pressão final" disabled={this.state.pression} onChange={this.formPressao}/>
                </div>
                <div className="sec">
                    <input type="number" name="Vo" placeholder="Volume inicial" disabled={this.state.volume} onChange={this.formVolumeInit}/>
                    <input type="number" name="V" placeholder="Volume final" disabled={this.state.volume} onChange={this.formVolume}/>
                </div>
                <div className="sec">
                    <input type="number" name="To" placeholder="Temperatura inicial" disabled={this.state.temperature} onChange={this.formTemperaturaInit}/>
                    <input type="number" name="T" placeholder="Temperatura final" disabled={this.state.temperature} onChange={this.formTemperatura}/>
                </div>

                <br></br>

                <input type="radio" name="iso" id="N" value="N" onChange={this.changeNothing} defaultChecked/>
                <label htmlFor="N">Todos mudam</label><br></br>

                <input type="radio" name="iso" id="T" value="T" onChange={this.changeTemperature}/>
                <label htmlFor="T">Isotérmica</label><br></br>

                <input type="radio" name="iso" id="P" value="P" onChange={this.changePression}/>
                <label htmlFor="P">Isobárica</label><br></br>

                <input type="radio" name="iso" id="V" value="V" onChange={this.changeVolume}/>
                <label htmlFor="V">Isovolumétrica</label><br></br>

                <br></br>

                <button>Calcular:</button>
                <div class="response">{this.state.respo}</div>
            </form>
        );
    }
}
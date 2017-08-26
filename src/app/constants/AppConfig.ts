import { TabTypeEnum } from './Enums'
import { ITab } from '../interfaces/ITab'

const Tabs : Array<ITab> = [
    { 
        id:'home',    
        label:'Home',       
        link:'/',         
        icon:'home',        
        security: { Type:TabTypeEnum.open, Scopes:undefined } 
    },
    { 
        id:'about',
        label:'About',
        link:'about',
        icon:'inser_comment',
        security: { Type:TabTypeEnum.open, Scopes:undefined } 
    },
    { 
        id:'start',
        label:'Build your bowl',
        link:'order/cereal',
        icon:'extension',  // icon:'pallete'
        security: { Type:TabTypeEnum.open, Scopes:undefined } 
    },
    { 
        id:'admin',
        label:'Admin Area',
        link:'/admin',
        icon:'code',
        security: { Type:TabTypeEnum.needsAuthorization, Scopes:["admin"]} 
    }
];

const Title = {
    label:  "cereal!",
    font:   "Roboto Mono"
}

const HomeGifs = [
    "/assets/img/home_gifs/bowl.gif",
    "/assets/img/home_gifs/cap.gif",
    "/assets/img/home_gifs/chris.gif",
    "/assets/img/home_gifs/climb.gif",
    "/assets/img/home_gifs/eye_holes.gif",
    "/assets/img/home_gifs/gumball.gif",
    "/assets/img/home_gifs/homer.gif",
    "/assets/img/home_gifs/jake.gif",
    "/assets/img/home_gifs/mario.gif",
    "/assets/img/home_gifs/mr-t.gif",
    "/assets/img/home_gifs/muppet.gif",
    "/assets/img/home_gifs/smacks.gif",
    "/assets/img/home_gifs/sponge-bob.gif",
    "/assets/img/home_gifs/tony-tiger.gif"
];

const API_URIs = {
    "dev": "http://localhost:8000/api/v0/",
    "prod" : ""
};


let colors = [
    "#EDBB0C", // D
    "#ED7A27", // M
    "#3DB1ED", // T
    "#26ED99", // W
    "#ED485C", // R
    "#1AA124", // F
    "#623EAB", // S
  ];
const WEEKDAY_COLOR : string = colors[ (new Date()).getDay() ];


const IS_DEV_ENVIRONMENT : boolean = true;

export const APP_CONFIG = {
    Tabs : Tabs,
    Title : Title,
    AppValues : {
        'homeGifs' : HomeGifs
    },
    ApiUris : API_URIs,
    isDev : IS_DEV_ENVIRONMENT,
    WeekdayColor : WEEKDAY_COLOR
};

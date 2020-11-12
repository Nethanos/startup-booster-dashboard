import {DateConverted} from  './DateConverter';

export default function mountTimeString(date: DateConverted): string {

    const {days, minutes, hours } = date;
    let timeString = '';

    if(days >= 1){
        timeString = `${days}days`;
        if(days === 1) {
            timeString = `${days}day`
        }
    }
    if(hours >=1){
        timeString += ` ${hours}h`
    }
    if(minutes >=1){
        timeString += `${minutes}m`
    }

    return timeString;
}
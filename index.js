const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
let currentBaseDate = new Date(2021,0,1);
window.onload = function(){

    mountCalendar(currentBaseDate);
    var buttonBack = document.getElementById('button-back');
    buttonBack.onclick = backMonth;

    var buttonForward = document.getElementById('button-forward');
    buttonForward.onclick = advanceMonth;
}

backMonth = function(){
    var month = currentBaseDate.getMonth() - 1 < 0 ? 11 : currentBaseDate.getMonth() - 1;
    var year = currentBaseDate.getMonth() - 1 < 0 ? currentBaseDate.getFullYear() - 1 : currentBaseDate.getFullYear();

    currentBaseDate = new Date(year,month, currentBaseDate.getDate());
    mountCalendar(currentBaseDate);
}

advanceMonth = function(){
    var month = currentBaseDate.getMonth() + 1 > 11 ? 0 : currentBaseDate.getMonth() + 1;
    var year = currentBaseDate.getMonth() + 1 > 11 ? currentBaseDate.getFullYear() + 1 : currentBaseDate.getFullYear();

    currentBaseDate = new Date(year,month, currentBaseDate.getDate());
    mountCalendar(currentBaseDate);
}

mountCalendar = function(baseDate){
    cleanCalendar();
    var rows = 5;
    var weekDays = ['D','S', 'T', 'Q', 'Q','S','S'];
    var table = document.getElementById('table-calendar');
    var head = document.getElementById('table-calendar-head');
    var body = document.getElementById('table-calendar-body');
    var rowHead = document.createElement('tr');
    var calendarHeaderTitle = document.getElementById('calendar-header-title');
    calendarHeaderTitle.innerText = getCalendarHeaderTitle(baseDate);
    headFactory();
    
    var currentDay = 1;
    var month = baseDate.getMonth();
    var fullYear = baseDate.getFullYear();
    var daysInMonth = getDaysInMonth(month, fullYear);
    var daysInMonthLastMonth = getDaysInMonth((month - 1 < 0 ? 11 : month - 1) , (month - 1 < 0 ? fullYear - 1: fullYear) )
    var firstDay = getFirstDayInWeek();
    var loopDay = 0;
    var daysToCompleteLastWeek = 0;
    //debugger;
    
        for(let i = 1; i <= rows; i++){
            let row = document.createElement('tr');
            if(i == 1) {
                loopDay = firstDay;
                
                for(var x = loopDay; x > 0 ; x--){
                    let button = document.createElement('button');
                    button.onclick = getDayClicked;
                    let td = document.createElement('td');
                    button.innerText = daysInMonthLastMonth - (x - 1);
                    button.setAttribute('data-value', new Date((month - 1 < 0 ? fullYear-1: fullYear), (month - 1 < 0 ? 11 : month - 1) , daysInMonthLastMonth - (x - 1)));

                    td.appendChild(button);
                    row.appendChild(td);
                }
            }
            else loopDay = 0;
            for(let j = 0; j < (weekDays.length - loopDay); j++){
                //if(i == rows) debugger;
                if(currentDay > daysInMonth) {
                    daysToCompleteLastWeek = weekDays.length - (j-1);
                    
                    for(var y = 1;y < daysToCompleteLastWeek;y++){
                        let button = document.createElement('button');
                        let td = document.createElement('td');
                        button.innerText = y;
                        button.setAttribute('data-value', new Date((month + 1 > 11 ? fullYear + 1 : fullYear),(month + 1 > 11 ? 1 : month+1), y));
                        button.onclick = getDayClicked;
                        td.appendChild(button);
                        row.appendChild(td);
                    }
                }
                if(currentDay > daysInMonth) break;
                
                let button = document.createElement('button');
                let td = document.createElement('td');
                button.innerText = currentDay;
                button.setAttribute('data-value', new Date(fullYear, month, currentDay));
                button.onclick = getDayClicked;
                td.appendChild(button);
                
                currentDay++;
                row.appendChild(td);
            }
            
            body.appendChild(row);
            if(i==rows)debugger;
            if(currentDay <= daysInMonth && i == rows) {
                var lastRow = document.createElement('tr');
                let dayNextMonth = 1;
                for(var x = 0; x < weekDays.length; x++){
                    daysToCompleteLastWeek = weekDays.length - (x-1);
                    if(currentDay > daysInMonth) {

                        let button = document.createElement('button');
                        let td = document.createElement('td');
                        button.innerText = dayNextMonth;
                        button.setAttribute('data-value', new Date((month + 1 > 11 ? fullYear + 1 : fullYear),(month + 1 > 11 ? 1 : month+1), dayNextMonth));
                        button.onclick = getDayClicked;
                        td.appendChild(button);

                        lastRow.appendChild(td);
                        dayNextMonth++;
                    }else{
                        let button = document.createElement('button');
                        let td = document.createElement('td');
                        button.innerText = currentDay;
                        button.setAttribute('data-value', new Date(fullYear, month, currentDay));
                        button.onclick = getDayClicked;
                        td.appendChild(button);

                        lastRow.appendChild(td);
                    }
                    currentDay++;
                }
                
                body.appendChild(lastRow);
            }
        }

        
    
}
cleanCalendar = function(){
    var head = document.getElementById('table-calendar-head');
    var body = document.getElementById('table-calendar-body');

    head.innerHTML = '';
    body.innerHTML = '';
}
headFactory = function(){
    var days = ['D','S', 'T', 'Q', 'Q','S','S'];
    var head = document.getElementById('table-calendar-head');
    var rowHead = document.createElement('tr');

    for(var i = 0; i < days.length; i++ ){
        let th = document.createElement('th');
        th.innerText = days[i];
        rowHead.appendChild(th);
    }

    head.appendChild(rowHead);
}

getDaysInMonth = function(month, year){
    return new Date(year, month+1,0).getDate();
}

getFirstDayInWeek = function(){
    var firstDay = currentBaseDate;
    firstDay.setDate(1);

    return firstDay.getDay();
}

getDayClicked = function(event){
    console.log(event.target.dataset.value);
}

getCalendarHeaderTitle = function(date){

    return monthNames[date.getMonth()];
}
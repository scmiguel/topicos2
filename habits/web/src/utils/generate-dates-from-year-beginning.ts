import dayjs from 'dayjs'
export function generateDatesFromYearBeginning() {
    // recupera o primeiro dia do ano sem hora e minuto
    const firstDayOfTheYear = dayjs().startOf('year')
    // data de hoje
    const today = new Date()
    // guarda os dias do intervalo
    const dates = []
    // guarda o primeiro dia do ano
    let compareDate = firstDayOfTheYear
    // enquanto a data de comparação for menor que a data de hoje
    while (compareDate.isBefore(today)) {
        // adiciona a data no vetor
        dates.push(compareDate.toDate())
        // inscremento a data de comparação
        compareDate = compareDate.add(1, 'day')
    }
    return dates
    
}
import RRule from 'rrule'
import { portuguese, portugueseStrings } from 'shared/AppConstants'

export function DateToUTC(date: Date = new Date()) {
    const nowUTC = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
    )

    return new Date(nowUTC)
}

export function TranslateRRule(rule: RRule) {
    // Date-related translations

    const gettext = (id) =>
        // Return pt. string, default to english.
        portugueseStrings[id] || id

    console.log(rule.toText(gettext, portuguese))
    return rule.toText(gettext, portuguese)
    // => cada 5 semanas em Segunda-Feira, Sexta-feira até Janeiro 31, 2013
}

export function ShowDateText(recurrenceRule?: string, dateString?: string) {
    if (!recurrenceRule || !dateString) return ''
    try {
        const dateStart = new Date(dateString)
        const dayName = portuguese.dayNames[dateStart.getDay()]
        const rruleString = TranslateRRule(
            RRule.fromString(recurrenceRule || ''),
        )

        return `${dayName}, às ${dateStart.toLocaleTimeString()} a ${rruleString}`
    } catch (error) {
        return ''
    }
}

export function ShowDateTextResumed(recurrenceRule?: string, dateString?: string) {
    if (!recurrenceRule || !dateString) return ''
    try {
        const dateStart = new Date(dateString)
        const dayName = portuguese.dayNames[dateStart.getDay()]
        const rruleString = TranslateRRule(
            RRule.fromString(recurrenceRule || ''),
        )

        return `${dayName}, a ${rruleString}`
    } catch (error) {
        return ''
    }
}

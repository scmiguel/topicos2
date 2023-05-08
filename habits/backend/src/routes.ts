import {FastifyInstance} from 'fastify'
import { prisma } from "./lib/prisma"
import dayjs from "dayjs"
import { z } from "zod"

export async function AppRoutes(app: FastifyInstance){
  // rota para criação de um hábito
    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
          title: z.string(),
          weekDays: z.array(
            z.number().min(0).max(6)
          )
        })
        const { title, weekDays } = createHabitBody.parse(request.body)
        // data de hoje -> 20/02/2023 - 00h00m00s
        const today = dayjs().startOf('day').toDate()
        // cria o hábito
        await prisma.habit.create({
          data: {
            title,
            created_at: today,
            weekDays: {
              create: weekDays.map(weekDay => {
                return {
                  week_day: weekDay
                }
              })
            }
          }
        })
      })
      // rota para, a partir de um dia, retorna hábitos possíveis de serem completados, e também os que foram completados
      app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date() // converte string para date
        })
        const {date} = getDayParams.parse(request.query)
        // 20230320T3122400 -> 20230320T3000000
        const parsedDate = dayjs(date).startOf('day')
        // 20230320T3000000 -> 1
        const weekDay = parsedDate.get('day')
        console.log(weekDay)
        // todos hábitos possívels
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at:{
                    lte: date
                },
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                }
            }
        })
        // todos hábitos realizados
        const day = await prisma.day.findUnique  ({
            where: {
                date: parsedDate.toDate()
            },
            include: {
                dayHabits: true // foi(ram) completados(s) hábito(s) neste dia
            }
        })
        const completedHabit = day?.dayHabits.map(dayHabit => {
          
            return dayHabit.habit_id
        }) ?? []
       
        return {
            possibleHabits,
            completedHabit
        }
    })
    // rota para atualizar a situação do hábito
    // hábito já completado será descompletado,
    // hábito não completado será completado
    app.patch('/habits/:id/toggle', async (request) => {
      const toggleHabitParams = z.object({
        id: z.string().uuid()
      })
  
      const { id } = toggleHabitParams.parse(request.params)
  
      // recupera o dia de hoje, sem hora, minuto e segundo
      const today = dayjs().startOf('day').toDate()
  
      // verifica se o dia já existe
      let day = await prisma.day.findUnique({
        where: {
          date: today
        }
      })
      // caso o dia não tenha sido criado ainda, pois apenas dias com hábitos // completados, existem
      if (!day) {
        day = await prisma.day.create({ // cria o dia
          data: {
            date: today
          }
        })
      }
      // procura para saber se o hábito já foi completado
      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id
          }
        }
      })
      // se já foi completado
      if (dayHabit) { // remove marcação
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id
          }
        })
      } else { //não foi completada, então cria
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id
          }
        })
      }
    })
  
    app.get('/summary', async () => {
      const summary = await prisma.$queryRaw`
        SELECT 
          D.id, 
          D.date,
          (
            SELECT 
              cast(count(*) as float)
            FROM day_habits DH
            WHERE DH.day_id = D.id
          ) as completed,
          (
            SELECT
              cast(count(*) as float)
            FROM habit_week_days HDW
            JOIN habits H
              ON H.id = HDW.habit_id
            WHERE
              HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
              AND H.created_at <= D.date
          ) as amount
        FROM days D
      `
      return summary
    })
  
}

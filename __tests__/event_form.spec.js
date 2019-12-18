import {mount, createLocalVue} from '@vue/test-utils'
import EventForm from '../components/eventForm/EventForm'
import ElementUI from 'element-ui'
import moment from 'moment'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe("validation test" , () => {

  let eventFormWrapper
  beforeEach(() => {
    eventFormWrapper = mount(EventForm, {
      localVue,
    })
  })

  const validTitle = 'dish'
  const nextDay = moment().add(1, 'd')
  const validDate = nextDay.format('YYYY-MM-DD')
  console.log(validDate)
  const validTime = nextDay.format('12:00')

  const validateForm = (input1, input2, input3, isSuccess, done) => {
    const inputs = eventFormWrapper.findAll('input')

    eventFormWrapper.vm.eventForm.title = input1
    eventFormWrapper.vm.eventForm.date = input2
    eventFormWrapper.vm.eventForm.time = input3

    eventFormWrapper.vm.$refs['eventForm'].validate((valid) => {
      expect(valid).toBe(isSuccess)
      done()
    })
  }

  test('valid input', (done) => {
    validateForm(validTitle, validDate, validTime, true, done)
  })

  test('empty title is invalid',  (done) => {
    validateForm('', validDate, validTime, false, done)
  })

  test('past time is invalid', (done) => {
    const now = moment()
    validateForm(validTitle, now.format('YYYY-MM-DD'),'00:00', false, done)
  })
})

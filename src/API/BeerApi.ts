import axios, { AxiosResponse } from 'axios'
import { IBeer } from '../types'
import { BEER_URl } from './../utils/consts'

export default class BeerApi {
  static async getAllBeer(): Promise<AxiosResponse<IBeer[]>> {
    const response = await axios.get(BEER_URl)
    return response.data
  }
}

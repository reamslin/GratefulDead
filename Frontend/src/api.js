/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const axios = require("axios");

const BASE_URL = "https://gddb-b7baf449e62a.herokuapp.com";

class GDApi {
  static async getSetlistById(id) {
    let res = await axios.get(`${BASE_URL}/setlists/${id}`);
    return res.data.setlist;
  }

  static async getSetlistsByFilter(filters) {
    let res = await axios.get(`${BASE_URL}/setlists`, { params: filters });
    return res.data.setlists;
  }

  static async getYears(filters) {
    let res = await axios.get(`${BASE_URL}/setlists/years`, {
      params: filters,
    });
    return res.data.years;
  }

  static async getMonths(filters) {
    let res = await axios.get(`${BASE_URL}/setlists/months`, {
      params: filters,
    });
    return res.data.months;
  }

  static async getDays(filters) {
    let res = await axios.get(`${BASE_URL}/setlists/days`, { params: filters });
    return res.data.days;
  }

  static async getNumPages(filters) {
    let res = await axios.get(`${BASE_URL}/setlists/count`, {
      params: filters,
    });
    return res.data.count;
  }

  static async getSongs(filters) {
    let res = await axios.get(`${BASE_URL}/songs`, { params: filters });
    return res.data.songs;
  }

  static async getVenues(filters) {
    let res = await axios.get(`${BASE_URL}/venues`, { params: filters });
    return res.data.venues;
  }

  static async getTours(filters) {
    let res = await axios.get(`${BASE_URL}/tours`, { params: filters });
    return res.data.tours;
  }

  static async getCovers(filters) {
    let res = await axios.get(`${BASE_URL}/covers`, { params: filters });
    return res.data.covers;
  }

  static async getPerformers(filters) {
    let res = await axios.get(`${BASE_URL}/notes/performers`, {
      params: filters,
    });
    return res.data.performers;
  }

  static async getStates(filters) {
    let res = await axios.get(`${BASE_URL}/venues/states`, { params: filters });
    return res.data.states;
  }

  static async getCities(filters) {
    let res = await axios.get(`${BASE_URL}/venues/cities`, { params: filters });
    return res.data.cities;
  }

  static async getCountries(filters) {
    let res = await axios.get(`${BASE_URL}/venues/countries`, {
      params: filters,
    });
    return res.data.countries;
  }
}

export default GDApi;

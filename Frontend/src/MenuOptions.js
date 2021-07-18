import React, { useState, useEffect, } from "react";
import { List, ListItem, makeStyles, IconButton } from "@material-ui/core";
import Queries from "./Queries";
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import GDApi from "./api";


const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
    },
    searchBar: {
        backgroundColor: theme.palette.divider
    }


}))


function MenuOptions({ toggle }) {
    const classes = useStyles();
    const [queries, setQueries] = useState(null);
    const [filters, setFilters] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function getQueriesOnMount() {
            let years = GDApi.getYears();
            let months = GDApi.getMonths();
            let days = GDApi.getDays();
            let songs = GDApi.getSongs();
            let venues = GDApi.getVenues();
            let covers = GDApi.getCovers();
            let performers = GDApi.getPerformers();
            let states = GDApi.getStates();
            let cities = GDApi.getCities();
            let countries = GDApi.getCountries();
            await Promise.all([years, months, days, songs, venues, covers, performers, cities, states, countries])
                .then(([years, months, days, songs, venues, covers, performers, cities, states, countries]) => {
                    let queries = { years, months, days, songs, venues, covers, performers, states, cities, countries }
                    setQueries(queries)
                });

        }
        getQueriesOnMount();
    }, []);

    useEffect(() => {
        async function getQueriesWithFilters() {
            let { years, months, days, venues, songs, covers, performers, states, cities, countries } = queries
            if (!filters.year) {
                years = GDApi.getYears(filters);
            }
            if (!filters.month) {
                months = GDApi.getMonths(filters);
            }
            if (!filters.day) {
                days = GDApi.getDays(filters);
            }
            if (!filters.venue) {
                venues = GDApi.getVenues(filters);
            }
            if (!filters.song) {
                songs = GDApi.getSongs(filters);
            }
            if (!filters.cover) {
                covers = GDApi.getCovers(filters);
            }
            if (!filters.performer) {
                performers = GDApi.getPerformers(filters);
            }
            if (!filters.state) {
                states = GDApi.getStates(filters);
            }
            if (!filters.city) {
                cities = GDApi.getCities(filters);
            }
            if (!filters.country) {
                countries = GDApi.getCountries(filters);
            }
            await Promise.all([years, months, days, songs, venues, covers, performers, cities, states, countries])
                .then(([years, months, days, songs, venues, covers, performers, cities, states, countries]) => {
                    setQueries({ years, months, days, venues, songs, covers, performers, states, cities, countries })
                })
        }
        if (queries !== null) {
            getQueriesWithFilters();
        }
    }, [filters]);

    function executeSearch() {
        let queryString = new URLSearchParams(filters).toString();
        history.push(`/setlists?${queryString}`)
        toggle()
    }

    if (!queries) return <> </>;
    return (
        <List className={classes.list}>
            <ListItem divider classes={{ root: classes.searchBar }}>
                <IconButton
                    onClick={executeSearch}
                    backgroundColor='primary'>
                    <SearchIcon style={{ fontSize: 80 }} />
                </IconButton>
                Choose one or more filters, then hit the search icon
            </ListItem>
            <Queries queryType='year' title='Years' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='month' title='Months' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='day' title='Days' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='venue' title='Venues' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='city' title='Cities' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='state' title='States' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='country' title='Countries' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='song' title='Songs' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='cover' title='Covers' filters={filters} setFilters={setFilters} queries={queries} />
            <Queries queryType='performer' title='Performers' filters={filters} setFilters={setFilters} queries={queries} />

        </List>
    )
}

export default MenuOptions;
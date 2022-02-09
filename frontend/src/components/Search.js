import { TextField, Button, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

function Search(props) {
    const [is_click, set_is_click] = useState(false);

    // api call
    async function q_search() {

        try {

            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json()

            // adding false instance of "state" paramteter for determining expanded or collapsed UI elements
            var new_results = []
            for (let item of data) {
                item["state"] = false
                item["copied"] = false
                new_results.push(item)
            }
            
            set_is_click(true)
            props["set_qresults"](new_results);

        } catch (error) {
            console.log(error)
        }
    }

    function handle_key_press(e) {
        if (e.key === "Enter") {
            q_search()
        }
    }

    // for gathering user input: the search term
    function update_qstring(e) {
        props["set_qstring"](e.target.value);
    }
      
    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    });

    return(
        <div className={is_click ? "Search Search-transform" : "Search"}>
            <ThemeProvider theme={theme}>
                <div>
                    <TextField
                    id="filled-hidden-label-normal"
                    label="Search our DnD database..."
                    variant="filled"
                    color=''

                    // helperText="Dungeons and Dragons"
                    onChange={update_qstring}
                    sx={{
                        width: 320,
                        color: '#ffebcd'
                    }}
                    className="search-bar"
                    onKeyPress={(e) => handle_key_press(e)}
                    />
                </div>
            </ThemeProvider>
            <div className="search-button">
                <Button variant="outlined" onClick={() => q_search()}>Search</Button>
            </div>
        </div>
    );
}

export default Search;
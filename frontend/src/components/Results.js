import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import copy from "./assets/copy.png"
import copy_blue from "./assets/copy_blue.png"

function Results(props) {

    function expand_collapse_text(key) {
        var new_results_data = [...props["qresults"]]
        new_results_data[key]["state"] = !new_results_data[key]["state"]
        props["set_qresults"](new_results_data)
    }

    function highlight_icon(key) {
        var new_results_data = [...props["qresults"]]

        for (let item of new_results_data) {
            item["copied"] = false
        }

        if (key >= 0) {
            new_results_data[key]["copied"] = true
        }
        
        props["set_qresults"](new_results_data)
    }

    if (!props["qresults"]) { return ("") }

    return (
        <>
            <div className="Results">
                <table className="table1">
                    <tbody>
                        <>
                            {props["qresults"].map((data, key) => {
                                return (
                                    <tr key={key}>
                                        <td className="grid-container">
                                            <div onClick={() => expand_collapse_text(key)}>
                                                <div className="header">
                                                    {data.title}
                                                    {/* {data.header} */}
                                                </div>
                                                <div className={props["qresults"][key]["state"] ? "content" : "content collapsed"}>
                                                    {data.body}
                                                </div>
                                                <div className="footnote">
                                                    <div>
                                                        {"Source: " + data.userId}
                                                        {/* {"Source: " + data.src[1]} */}
                                                    </div>
                                                    <div>
                                                        {"tags: [" + data.id + "]"}
                                                        {/* {"tags: [" + data.type + "]"} */}
                                                    </div>
                                                </div>
                                            </div>
                                            <CopyToClipboard text={props["qresults"][key]["body"]}>
                                                <div className="button" onClick={() => highlight_icon(key)}>
                                                    <img
                                                        src={props["qresults"][key]["copied"] ? copy_blue : copy}
                                                        alt="copy to clipboard icon"
                                                        className="icon">
                                                    </img>
                                                </div>
                                            </CopyToClipboard>
                                        </td>
                                        
                                    </tr>
                                )
                            })}
                        </>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Results;
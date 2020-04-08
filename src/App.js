import React from "react";
import "assets/less/app.less";
import Store from "stores";
import ChangeFlavour from "container/ChangeFlavour";

export default function () {
    return (
        <Store>
            <ChangeFlavour />
        </Store>
    );
}

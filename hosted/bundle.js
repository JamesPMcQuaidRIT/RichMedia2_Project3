"use strict";

var token = void 0;

var handleAdventurer = function handleAdventurer(e) {
    e.preventDefault();

    $("#adventurerMessage").animate({ width: 'hide' }, 350);

    if ($("#adventurerName").val() == '' || $("#adventurerLevel").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }

    console.dir($("#adventurerForm").serialize());

    sendAjax('POST', $("#adventurerForm").attr("action"), $("#adventurerForm").serialize(), function () {
        loadAdventurersFromServer(token);
    });

    return false;
};

var handleLevelUp = function handleLevelUp(e) {
    e.preventDefault();

    sendAjax('POST', e.target.action, $(e.target).serialize(), function () {
        loadAdventurersFromServer(token);
    });

    return false;
};

var handleStatUp = function handleStatUp(e) {
    e.preventDefault();

    sendAjax('POST', e.target.action, $(e.target).serialize(), function () {
        loadAdventurersFromServer(token);
    });

    return false;
};

var handleSpell = function handleSpell(e) {
    e.preventDefault();

    $("#adventurerMessage").animate({ width: 'hide' }, 350);

    if ($("#spellName").val() == '' || $("#spellLevel").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }

    console.dir($("#spellForm").serialize());

    sendAjax('POST', $("#spellForm").attr("action"), $("#spellForm").serialize(), function () {
        loadSpellsFromServer(token);
    });

    return false;
};

var handleWeapon = function handleWeapon(e) {
    e.preventDefault();

    $("#adventurerMessage").animate({ width: 'hide' }, 350);

    if ($("#weaponName").val() == '' || $("#weaponType").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }

    console.dir($("#weaponForm").serialize());

    sendAjax('POST', $("#weaponForm").attr("action"), $("#weaponForm").serialize(), function () {
        loadWeaponsFromServer(token);
    });

    return false;
};

var handlePassword = function handlePassword(e) {
    e.preventDefault();

    $("#adventurerMessage").animate({ width: 'hide' }, 350);

    if ($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("You passcodes do not match");
        return false;
    }

    sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

    return false;
};

var handleBarracks = function handleBarracks(e) {
    e.preventDefault();

    console.dir($("#barracksForm").serialize());

    sendAjax('POST', $("#barracksForm").attr("action"), $("#barracksForm").serialize(), function () {
        displayMissionResult(token);
    });
    return false;
};

var handleMission = function handleMission(e) {
    e.preventDefault();

    $("#adventurerMessage").animate({ width: 'hide' }, 350);

    if ($("#missionTitle").val() == '' || $("#missionDifficulty").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }

    console.dir($("#missionForm").serialize());

    sendAjax('POST', $("#missionForm").attr("action"), $("#missionForm").serialize(), function () {
        loadMissionsFromServer(token);
    });

    return false;
};

var AdventurerForm = function AdventurerForm(props) {
    return React.createElement(
        "form",
        { id: "adventurerForm",
            onSubmit: handleAdventurer,
            name: "adventurerForm",
            action: "/maker",
            method: "POST",
            className: "adventurerForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "adventurerName", type: "text", name: "name", placeholder: "Adventurer Name" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Level: "
        ),
        React.createElement("input", { id: "adventurerLevel", type: "text", name: "level", placeholder: "Adventurer Level" }),
        React.createElement(
            "label",
            { id: "statLabel" },
            "Stats(3 points per level):"
        ),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Strength: "
        ),
        React.createElement("input", { id: "adventurerLevel", type: "text", name: "strength", placeholder: "Strength" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Dexterity: "
        ),
        React.createElement("input", { id: "adventurerLevel", type: "text", name: "dexterity", placeholder: "Dexterity" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Intellect: "
        ),
        React.createElement("input", { id: "adventurerLevel", type: "text", name: "intellect", placeholder: "Intellect" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Charisma: "
        ),
        React.createElement("input", { id: "adventurerLevel", type: "text", name: "charisma", placeholder: "Charisma" }),
        React.createElement(
            "select",
            { id: "adventurerClass", name: "class" },
            React.createElement(
                "option",
                { value: "Barbarian" },
                "Barbarian"
            ),
            React.createElement(
                "option",
                { value: "Monk" },
                "Monk"
            ),
            React.createElement(
                "option",
                { value: "Paladin" },
                "Paladin"
            ),
            React.createElement(
                "option",
                { value: "Rogue" },
                "Rogue"
            ),
            React.createElement(
                "option",
                { value: "Wizard" },
                "Wizard"
            )
        ),
        React.createElement("input", { id: "csrfValue", type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeAdventurerSubmit", type: "submit", value: "Make Adventurer" })
    );
};

var AdventurerList = function AdventurerList(props) {
    if (props.adventurers.length === 0) {
        return React.createElement(
            "div",
            { className: "adventurerList" },
            React.createElement(
                "h3",
                { className: "empty" },
                "No Adventurers yet"
            )
        );
    }

    var adventurerNodes = props.adventurers.map(function (adventurer) {
        return React.createElement(
            "div",
            { "data-key": adventurer._id, className: "adventurer" },
            React.createElement("img", { src: "/assets/img/adventurerface.png", alt: "adventurer face", className: "adventurerFace" }),
            React.createElement(
                "h3",
                { className: "adventurerName" },
                "Name: ",
                adventurer.name
            ),
            React.createElement(
                "h3",
                { className: "adventurerLevel" },
                "Level: ",
                adventurer.level
            ),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Class: ",
                adventurer.class
            ),
            React.createElement("div", { className: "statBreak" }),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Strength: ",
                adventurer.strength
            ),
            React.createElement(
                "form",
                { id: "strengthForm",
                    onSubmit: handleStatUp,
                    name: "strengthForm",
                    action: "/strength",
                    method: "POST",
                    className: "strengthForm"
                },
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { id: "adventurerNameCheck", name: "_id", type: "hidden", value: adventurer._id, placeholder: "Adventurer Name" }),
                React.createElement("input", { className: "statButton", type: "submit", value: "Str Up" })
            ),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Dexterity: ",
                adventurer.dexterity
            ),
            React.createElement(
                "form",
                { id: "dexterityForm",
                    onSubmit: handleStatUp,
                    name: "dexterityForm",
                    action: "/dexterity",
                    method: "POST",
                    className: "dexterityForm"
                },
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { id: "adventurerNameCheck", name: "_id", type: "hidden", value: adventurer._id, placeholder: "Adventurer Name" }),
                React.createElement("input", { className: "statButton", type: "submit", value: "Dex Up" })
            ),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Intellect: ",
                adventurer.intellect
            ),
            React.createElement(
                "form",
                { id: "intellectForm",
                    onSubmit: handleStatUp,
                    name: "intellectForm",
                    action: "/intellect",
                    method: "POST",
                    className: "intellectForm"
                },
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { id: "adventurerNameCheck", name: "_id", type: "hidden", value: adventurer._id, placeholder: "Adventurer Name" }),
                React.createElement("input", { className: "statButton", type: "submit", value: "Int Up" })
            ),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Charisma: ",
                adventurer.charisma
            ),
            React.createElement(
                "form",
                { id: "charismaForm",
                    onSubmit: handleStatUp,
                    name: "charismaForm",
                    action: "/charisma",
                    method: "POST",
                    className: "charismaForm"
                },
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { id: "adventurerNameCheck", name: "_id", type: "hidden", value: adventurer._id, placeholder: "Adventurer Name" }),
                React.createElement("input", { className: "statButton", type: "submit", value: "Char Up" })
            )
        );
    });

    return React.createElement(
        "div",
        { className: "adventurerList" },
        adventurerNodes
    );
};

var loadAdventurersFromServer = function loadAdventurersFromServer(csrf) {
    sendAjax('GET', '/getAdventurers', null, function (data) {
        ReactDOM.render(React.createElement(AdventurerList, { adventurers: data.adventurer, csrf: csrf }), document.querySelector("#data"));
    });
};

var createAdventurerWindow = function createAdventurerWindow(csrf) {
    ReactDOM.render(React.createElement(AdventurerForm, { csrf: csrf }), document.querySelector("#make"));

    ReactDOM.render(React.createElement(AdventurerList, { adventurers: [], csrf: csrf }), document.querySelector("#data"));

    loadAdventurersFromServer(csrf);
};

var SpellForm = function SpellForm(props) {
    return React.createElement(
        "form",
        { id: "spellForm",
            onSubmit: handleSpell,
            name: "spellForm",
            action: "/spellMaker",
            method: "POST",
            className: "spellForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "spellName", type: "text", name: "name", placeholder: "Spell Name" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Level: "
        ),
        React.createElement("input", { id: "spellLevel", type: "text", name: "level", placeholder: "Spell Level" }),
        React.createElement(
            "label",
            { htmlFor: "purpose" },
            "Purpose: "
        ),
        React.createElement("input", { id: "spellPurpose", type: "text", name: "purpose", placeholder: "Spell's Purpose" }),
        React.createElement("input", { id: "csrfValue", type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeSpellSubmit", type: "submit", value: "Make Spell" })
    );
};

var SpellList = function SpellList(props) {
    if (props.spells.length === 0) {
        return React.createElement(
            "div",
            { className: "spellList" },
            React.createElement(
                "h3",
                { className: "empty" },
                "No Spells created yet"
            )
        );
    }

    var spellNodes = props.spells.map(function (spell) {
        return React.createElement(
            "div",
            { "data-key": spell._id, className: "adventurer" },
            React.createElement("img", { src: "/assets/img/magicIcon.png", alt: "adventurer face", className: "adventurerFace" }),
            React.createElement(
                "h3",
                { className: "adventurerName" },
                "Name: ",
                spell.name
            ),
            React.createElement(
                "h3",
                { className: "adventurerLevel" },
                "Level: ",
                spell.level
            ),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Purpose: ",
                spell.purpose
            )
        );
    });

    return React.createElement(
        "div",
        { className: "spellList" },
        spellNodes
    );
};

var loadSpellsFromServer = function loadSpellsFromServer(csrf) {
    sendAjax('GET', '/getSpells', null, function (data) {
        ReactDOM.render(React.createElement(SpellList, { spells: data.spell, csrf: csrf }), document.querySelector("#data"));
    });
};

var createSpellWindow = function createSpellWindow(csrf) {
    ReactDOM.render(React.createElement(SpellForm, { csrf: csrf }), document.querySelector("#make"));

    ReactDOM.render(React.createElement(SpellList, { spells: [], csrf: csrf }), document.querySelector("#data"));

    loadSpellsFromServer(csrf);
};

var WeaponForm = function WeaponForm(props) {
    return React.createElement(
        "form",
        { id: "weaponForm",
            onSubmit: handleWeapon,
            name: "weaponForm",
            action: "/weaponMaker",
            method: "POST",
            className: "weaponForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "weaponName", type: "text", name: "name", placeholder: "Weapon Name" }),
        React.createElement(
            "label",
            { htmlFor: "type" },
            "Type: "
        ),
        React.createElement("input", { id: "weaponType", type: "text", name: "type", placeholder: "Weapon Type" }),
        React.createElement(
            "label",
            { htmlFor: "rarity" },
            "Rarity(1-10): "
        ),
        React.createElement("input", { id: "weaponRarity", type: "text", name: "rarity", placeholder: "Weapon Rarity" }),
        React.createElement(
            "label",
            { htmlFor: "damage" },
            "Damage(Up to 2x Rarity): "
        ),
        React.createElement("input", { id: "weaponDamage", type: "text", name: "damage", placeholder: "Weapon Damage" }),
        React.createElement(
            "label",
            { htmlFor: "description" },
            "Description: "
        ),
        React.createElement("input", { id: "weaponDescription", type: "text", name: "description", placeholder: "Weapon Description" }),
        React.createElement("input", { id: "csrfValue", type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeWeaponSubmit", type: "submit", value: "Make Weapon" })
    );
};

var WeaponList = function WeaponList(props) {
    if (props.weapons.length === 0) {
        return React.createElement(
            "div",
            { className: "weaponList" },
            React.createElement(
                "h3",
                { className: "empty" },
                "No Weapons created yet"
            )
        );
    }

    var weaponNodes = props.weapons.map(function (weapon) {
        console.dir(weapon.description);
        return React.createElement(
            "div",
            { "data-key": weapon._id, className: "adventurer" },
            React.createElement("img", { src: "/assets/img/weaponIcon.png", alt: "adventurer face", className: "adventurerFace" }),
            React.createElement(
                "h3",
                { className: "weaponName" },
                "Name: ",
                weapon.name
            ),
            React.createElement(
                "h3",
                { className: "weaponType" },
                "Type: ",
                weapon.type
            ),
            React.createElement(
                "h3",
                { className: "weaponRarity" },
                "Rarity: ",
                weapon.rarity
            ),
            React.createElement(
                "h3",
                { className: "weaponDamage" },
                "Damage: ",
                weapon.damage
            ),
            React.createElement(
                "h3",
                { className: "weaponDescription" },
                "Description: ",
                weapon.description
            )
        );
    });

    return React.createElement(
        "div",
        { className: "weaponList" },
        weaponNodes
    );
};

var loadWeaponsFromServer = function loadWeaponsFromServer(csrf) {
    sendAjax('GET', '/getWeapons', null, function (data) {
        ReactDOM.render(React.createElement(WeaponList, { weapons: data.weapon, csrf: csrf }), document.querySelector("#data"));
    });
};

var createWeaponWindow = function createWeaponWindow(csrf) {
    ReactDOM.render(React.createElement(WeaponForm, { csrf: csrf }), document.querySelector("#make"));

    ReactDOM.render(React.createElement(WeaponList, { weapons: [], csrf: csrf }), document.querySelector("#data"));

    loadWeaponsFromServer(csrf);
};

var EmptyForm = function EmptyForm(props) {
    return null;
};

var PasswordWindow = function PasswordWindow(props) {
    return React.createElement(
        "form",
        { id: "passwordForm",
            name: "passwordForm",
            onSubmit: handlePassword,
            action: "/passwordChange",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "label",
            { "for": "pass" },
            "Old Password: "
        ),
        React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "old password" }),
        React.createElement(
            "label",
            { "for": "pass" },
            "New Password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement(
            "label",
            { "for": "pass2" },
            "New Password Again: "
        ),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Update" })
    );
};

var createPasswordWindow = function createPasswordWindow(csrf) {
    ReactDOM.render(React.createElement(EmptyForm, null), document.querySelector("#make"));

    ReactDOM.render(React.createElement(PasswordWindow, { csrf: csrf }), document.querySelector("#data"));
};

var BarracksForm = function BarracksForm(props) {
    return React.createElement(
        "form",
        { id: "barracksForm",
            onSubmit: handleBarracks,
            name: "barracksForm",
            action: "/goOnMission",
            method: "POST",
            className: "barracksForm"
        },
        React.createElement(
            "label",
            { htmlFor: "adventurer" },
            "Adventurer: "
        ),
        React.createElement(AdventurerContent, { adventurers: props.adventurers }),
        React.createElement(
            "label",
            { htmlFor: "weapon" },
            "Weapon: "
        ),
        React.createElement(WeaponContent, { weapons: props.weapons }),
        React.createElement(
            "label",
            { htmlFor: "spell" },
            "Spell: "
        ),
        React.createElement(SpellContent, { spells: props.spells }),
        React.createElement(
            "label",
            { htmlFor: "mission" },
            "Mission: "
        ),
        React.createElement(MissionContent, { missions: props.missions }),
        React.createElement("input", { id: "csrfValue", type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "goAdventureSubmit", type: "submit", value: "Go Adventure" })
    );
};

var AdventurerContent = function AdventurerContent(props) {
    if (props.adventurers.length === 0) {
        return React.createElement(
            "select",
            { id: "adventurerSelect", type: "text", name: "adventurer" },
            React.createElement(
                "option",
                null,
                "No Adventurers"
            )
        );
    }

    var adventurerOptions = props.adventurers.map(function (adventurer) {
        return React.createElement(
            "option",
            { value: JSON.stringify(adventurer) },
            adventurer.name
        );
    });

    return React.createElement(
        "select",
        { id: "adventurerSelect", type: "text", name: "adventurer" },
        adventurerOptions
    );
};

var WeaponContent = function WeaponContent(props) {
    if (props.weapons.length === 0) {
        return React.createElement(
            "select",
            { id: "weapon", type: "text", name: "weapon" },
            React.createElement(
                "option",
                null,
                "No Weapons"
            )
        );
    }

    var weaponOptions = props.weapons.map(function (weapon) {
        return React.createElement(
            "option",
            { value: JSON.stringify(weapon) },
            weapon.name
        );
    });

    return React.createElement(
        "select",
        { id: "weapon", type: "text", name: "weapon" },
        weaponOptions
    );
};

var SpellContent = function SpellContent(props) {
    if (props.spells.length === 0) {
        return React.createElement(
            "select",
            { id: "spell", type: "text", name: "spell" },
            React.createElement(
                "option",
                null,
                "No Spells"
            )
        );
    }

    var spellOptions = props.spells.map(function (spell) {
        return React.createElement(
            "option",
            { value: JSON.stringify(spell) },
            spell.name
        );
    });

    return React.createElement(
        "select",
        { id: "spell", type: "text", name: "spell" },
        spellOptions
    );
};

var MissionContent = function MissionContent(props) {
    console.dir(props);
    if (props.missions.length === 0) {
        return React.createElement(
            "select",
            { id: "mission", type: "text", name: "mission" },
            React.createElement(
                "option",
                null,
                "No Missions"
            )
        );
    }

    var missionOptions = props.missions.map(function (mission) {
        return React.createElement(
            "option",
            { value: JSON.stringify(mission) },
            mission.title
        );
    });

    return React.createElement(
        "select",
        { id: "mission", type: "text", name: "mission" },
        missionOptions
    );
};

var loadInfoToBarracks = function loadInfoToBarracks(csrf) {
    var advents = [];
    var weps = [];
    var sps = [];
    var miss = [];

    sendAjax('GET', '/getAdventurers', null, function (data) {
        advents = data.adventurer;
        renderBarracks(csrf, advents, sps, weps, miss);
    });

    sendAjax('GET', '/getWeapons', null, function (data) {
        weps = data.weapon;
        renderBarracks(csrf, advents, sps, weps, miss);
    });

    sendAjax('GET', '/getSpells', null, function (data) {
        sps = data.spell;
        renderBarracks(csrf, advents, sps, weps, miss);
    });

    sendAjax('GET', '/getMissions', null, function (data) {
        console.dir(data);
        miss = data.mission;
        renderBarracks(csrf, advents, sps, weps, miss);
    });
};

var renderBarracks = function renderBarracks(csrf, advents, sps, weps, miss) {
    ReactDOM.render(React.createElement(BarracksForm, { adventurers: advents, spells: sps, weapons: weps, missions: miss, csrf: csrf }), document.querySelector("#make"));

    ReactDOM.render(React.createElement(EmptyList, null), document.querySelector("#data"));
};

var displayMissionResult = function displayMissionResult(csrf) {
    sendAjax('GET', '/updateBarracksMessage', null, function (data) {
        if (data.mission.status === "success") {
            var send = {
                adventurer: document.querySelector("#adventurerSelect").value,
                _csrf: csrf
            };
            sendAjax('POST', "/level", send, function () {});
            ReactDOM.render(React.createElement(ResultMessage, { result: "success" }), document.querySelector("#data"));
        } else {
            ReactDOM.render(React.createElement(ResultMessage, { result: "failure" }), document.querySelector("#data"));
        }
    });
};

var EmptyList = function EmptyList(props) {
    return null;
};

var ResultMessage = function ResultMessage(props) {
    if (props.result === "success") {
        return React.createElement(
            "div",
            { className: "weaponList" },
            React.createElement(
                "h3",
                { className: "empty" },
                "Mission Was A Success"
            )
        );
    } else {
        return React.createElement(
            "div",
            { className: "weaponList" },
            React.createElement(
                "h3",
                { className: "empty" },
                "Mission Was A Failure"
            )
        );
    }
};

var createBarracksWindow = function createBarracksWindow(csrf) {
    ReactDOM.render(React.createElement(BarracksForm, { adventurers: [], weapons: [], spells: [], missions: [], csrf: csrf }), document.querySelector("#make"));

    ReactDOM.render(React.createElement(EmptyList, null), document.querySelector("#data"));

    loadInfoToBarracks(csrf);
};

var MissionForm = function MissionForm(props) {
    return React.createElement(
        "form",
        { id: "missionForm",
            onSubmit: handleMission,
            name: "missionForm",
            action: "/missionMaker",
            method: "POST",
            className: "barracksForm"
        },
        React.createElement(
            "label",
            { htmlFor: "title" },
            "Title: "
        ),
        React.createElement("input", { id: "missionTitle", type: "text", name: "title", placeholder: "Mission Title" }),
        React.createElement(
            "label",
            { htmlFor: "difficulty" },
            "Difficulty: "
        ),
        React.createElement("input", { id: "missionDifficulty", type: "text", name: "difficulty", placeholder: "Mission Difficulty" }),
        React.createElement(
            "label",
            { htmlFor: "type" },
            "Type: "
        ),
        React.createElement(
            "select",
            { id: "missionType", name: "type" },
            React.createElement(
                "option",
                { value: "Extermination" },
                "Extermination"
            ),
            React.createElement(
                "option",
                { value: "Diplomatic" },
                "Diplomatic"
            ),
            React.createElement(
                "option",
                { value: "Reasearch" },
                "Reasearch"
            ),
            React.createElement(
                "option",
                { value: "Assassination" },
                "Assassination"
            ),
            React.createElement(
                "option",
                { value: "Exploration" },
                "Exploration"
            ),
            React.createElement(
                "option",
                { value: "Trade" },
                "Trade"
            ),
            React.createElement(
                "option",
                { value: "Thievery" },
                "Thievery"
            )
        ),
        React.createElement("input", { id: "csrfValue", type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeMissionSubmit", type: "submit", value: "Create Mission" })
    );
};

var MissionList = function MissionList(props) {
    console.dir(props);
    if (props.missions.length === 0) {
        return React.createElement(
            "div",
            { className: "missionList" },
            React.createElement(
                "h3",
                { className: "empty" },
                "No Missions created yet"
            )
        );
    }

    var missionNodes = props.missions.map(function (mission) {
        return React.createElement(
            "div",
            { "data-key": mission._id, className: "adventurer" },
            React.createElement("img", { src: "/assets/img/missionIcon.png", alt: "mission icon", className: "adventurerFace" }),
            React.createElement(
                "h3",
                { className: "adventurerName" },
                "Title: ",
                mission.title
            ),
            React.createElement(
                "h3",
                { className: "adventurerLevel" },
                "Difficulty: ",
                mission.difficulty
            ),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Type: ",
                mission.type
            )
        );
    });

    return React.createElement(
        "div",
        { className: "missionList" },
        missionNodes
    );
};

var loadMissionsFromServer = function loadMissionsFromServer(csrf) {
    sendAjax('GET', '/getMissions', null, function (data) {
        ReactDOM.render(React.createElement(MissionList, { missions: data.mission, csrf: csrf }), document.querySelector("#data"));
    });
};

var createMissionsWindow = function createMissionsWindow(csrf) {
    ReactDOM.render(React.createElement(MissionForm, { csrf: csrf }), document.querySelector("#make"));

    ReactDOM.render(React.createElement(MissionList, { missions: [], csrf: csrf }), document.querySelector("#data"));

    loadMissionsFromServer(csrf);
};

var setup = function setup(csrf) {

    token = csrf;

    var adventurerButton = document.querySelector("#adventurerButton");
    var spellButton = document.querySelector("#spellButton");
    var weaponButton = document.querySelector("#weaponButton");
    var passwordButton = document.querySelector("#passwordButton");
    var barracksButton = document.querySelector("#barracksButton");
    var missionsButton = document.querySelector('#missionsButton');

    adventurerButton.addEventListener("click", function (e) {
        e.preventDefault();
        createAdventurerWindow(csrf);
        return false;
    });

    spellButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSpellWindow(csrf);
        return false;
    });

    weaponButton.addEventListener("click", function (e) {
        e.preventDefault();
        createWeaponWindow(csrf);
        return false;
    });

    passwordButton.addEventListener("click", function (e) {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });

    barracksButton.addEventListener("click", function (e) {
        e.preventDefault();
        createBarracksWindow(csrf);
        return false;
    });

    missionsButton.addEventListener("click", function (e) {
        e.preventDefault();
        createMissionsWindow(csrf);
        return false;
    });

    createAdventurerWindow(csrf);
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#adventurerMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#adventurerMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};

let token;

const handleAdventurer = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#adventurerName").val() == '' || $("#adventurerLevel").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
       
    console.dir($("#adventurerForm").serialize());
    
    sendAjax('POST', $("#adventurerForm").attr("action"), $("#adventurerForm").serialize(), function(){
        loadAdventurersFromServer(token);
    });
    
    return false;
};

const handleLevelUp = (e) => {
    e.preventDefault();
    
    sendAjax('POST', e.target.action, $(e.target).serialize(), function(){
        loadAdventurersFromServer(token);
    });

    return false;
};

const handleStatUp = (e) => {
    e.preventDefault();
    
    sendAjax('POST', e.target.action, $(e.target).serialize(), function(){
        loadAdventurersFromServer(token);
    });

    return false;
};

const handleSpell = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#spellName").val() == '' || $("#spellLevel").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
    
    console.dir($("#spellForm").serialize());
            
    sendAjax('POST', $("#spellForm").attr("action"), $("#spellForm").serialize(), function(){
        loadSpellsFromServer(token);
    });
    
    return false;
};

const handleWeapon = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#weaponName").val() == '' || $("#weaponType").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
    
    console.dir($("#weaponForm").serialize());
            
    sendAjax('POST', $("#weaponForm").attr("action"), $("#weaponForm").serialize(), function(){
        loadWeaponsFromServer(token);
    });
    
    return false;
};

const handlePassword = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
        
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("You passcodes do not match");
        return false;
    }    
    
    sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
    
    return false;
};

const handleBarracks = (e) => {
    e.preventDefault();

    console.dir($("#barracksForm").serialize());
            
    sendAjax('POST', $("#barracksForm").attr("action"), $("#barracksForm").serialize(), function(){
        displayMissionResult(token);
    });
    return false;
};

const handleMission = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#missionTitle").val() == '' || $("#missionDifficulty").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
    
    console.dir($("#missionForm").serialize());
            
    sendAjax('POST', $("#missionForm").attr("action"), $("#missionForm").serialize(), function(){
        loadMissionsFromServer(token);
    });
    
    return false;
};

const AdventurerForm = (props) => {
    return (
    <form id="adventurerForm" 
        onSubmit={handleAdventurer}
        name="adventurerForm"
        action="/maker"
        method="POST"
        className="adventurerForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="adventurerName" type="text" name="name" placeholder="Adventurer Name"/>
    <label htmlFor="level">Level: </label>
    <input id="adventurerLevel" type="text" name="level" placeholder="Adventurer Level"/>
    <label id="statLabel">Stats(3 points per level):</label>
    <label htmlFor="level">Strength: </label>
    <input id="adventurerLevel" type="text" name="strength" placeholder="Strength"/>
    <label htmlFor="level">Dexterity: </label>
    <input id="adventurerLevel" type="text" name="dexterity" placeholder="Dexterity"/>
    <label htmlFor="level">Intellect: </label>
    <input id="adventurerLevel" type="text" name="intellect" placeholder="Intellect"/>
    <label htmlFor="level">Charisma: </label>
    <input id="adventurerLevel" type="text" name="charisma" placeholder="Charisma"/>
    <select id="adventurerClass" name="class">
         <option value="Barbarian">Barbarian</option>
         <option value="Monk">Monk</option>  
        <option value="Paladin">Paladin</option>  
        <option value="Rogue">Rogue</option>  
        <option value="Wizard">Wizard</option> 
    </select>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeAdventurerSubmit" type="submit" value="Make Adventurer" />
    </form>
    );
};

const AdventurerList = function(props) {
    if(props.adventurers.length === 0) {
        return (
            <div className="adventurerList">
                <h3 className="empty">No Adventurers yet</h3>
            </div>
        );
    }
    
    const adventurerNodes = props.adventurers.map(function(adventurer) {
        return (
            <div data-key={adventurer._id} className="adventurer">
                <img src="/assets/img/adventurerface.png" alt="adventurer face" className="adventurerFace" />
                <h3 className="adventurerName">Name: {adventurer.name}</h3>
                <h3 className="adventurerLevel">Level: {adventurer.level}</h3>
                <h3 className="adventurerClass">Class: {adventurer.class}</h3>
                <div className="statBreak"></div>
                <h3 className="adventurerClass">Strength: {adventurer.strength}</h3>
                <form id="strengthForm" 
                    onSubmit={handleStatUp}
                    name="strengthForm"
                    action="/strength"
                    method="POST"
                    className="strengthForm"
                >
                    <input type="hidden" name="_csrf" value={props.csrf}/>
                    <input id="adventurerNameCheck" name="_id" type="hidden" value={adventurer._id} placeholder="Adventurer Name"/>
                    <input className="statButton" type="submit" value="Str Up"/>
                </form>
                <h3 className="adventurerClass">Dexterity: {adventurer.dexterity}</h3>
                <form id="dexterityForm" 
                    onSubmit={handleStatUp}
                    name="dexterityForm"
                    action="/dexterity"
                    method="POST"
                    className="dexterityForm"
                >
                    <input type="hidden" name="_csrf" value={props.csrf}/>
                    <input id="adventurerNameCheck" name="_id" type="hidden" value={adventurer._id} placeholder="Adventurer Name"/>
                    <input className="statButton" type="submit" value="Dex Up"/>
                </form>
                <h3 className="adventurerClass">Intellect: {adventurer.intellect}</h3>
                <form id="intellectForm" 
                    onSubmit={handleStatUp}
                    name="intellectForm"
                    action="/intellect"
                    method="POST"
                    className="intellectForm"
                >
                    <input type="hidden" name="_csrf" value={props.csrf}/>
                    <input id="adventurerNameCheck" name="_id" type="hidden" value={adventurer._id} placeholder="Adventurer Name"/>
                    <input className="statButton" type="submit" value="Int Up"/>
                </form>
                <h3 className="adventurerClass">Charisma: {adventurer.charisma}</h3>
                <form id="charismaForm" 
                    onSubmit={handleStatUp}
                    name="charismaForm"
                    action="/charisma"
                    method="POST"
                    className="charismaForm"
                >
                    <input type="hidden" name="_csrf" value={props.csrf}/>
                    <input id="adventurerNameCheck" name="_id" type="hidden" value={adventurer._id} placeholder="Adventurer Name"/>
                    <input className="statButton" type="submit" value="Char Up"/>
                </form>
            </div>
        );
    });
    
    return (
    <div className="adventurerList">
        {adventurerNodes}
    </div>
    );
};



const loadAdventurersFromServer = (csrf) => {
    sendAjax('GET', '/getAdventurers', null, (data) => {
        ReactDOM.render(
            <AdventurerList adventurers={data.adventurer} csrf={csrf} />, document.querySelector("#data")
        );
    });
};

const createAdventurerWindow = (csrf) => {
    ReactDOM.render(
        <AdventurerForm csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <AdventurerList adventurers={[]} csrf={csrf}/>, document.querySelector("#data")
    );
    
    loadAdventurersFromServer(csrf);
}

const SpellForm = (props) => {
    return (
    <form id="spellForm" 
        onSubmit={handleSpell}
        name="spellForm"
        action="/spellMaker"
        method="POST"
        className="spellForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="spellName" type="text" name="name" placeholder="Spell Name"/>
    <label htmlFor="level">Level: </label>
    <input id="spellLevel" type="text" name="level" placeholder="Spell Level"/>
    <label htmlFor="purpose">Purpose: </label>
    <input id="spellPurpose" type="text" name="purpose" placeholder="Spell's Purpose"/>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeSpellSubmit" type="submit" value="Make Spell" />
    </form>
    );
};

const SpellList = function(props) {
    if(props.spells.length === 0) {
        return (
            <div className="spellList">
                <h3 className="empty">No Spells created yet</h3>
            </div>
        );
    }
    
    const spellNodes = props.spells.map(function(spell) {
        return (
            <div data-key={spell._id} className="adventurer">
                <img src="/assets/img/magicIcon.png" alt="adventurer face" className="adventurerFace" />
                <h3 className="adventurerName">Name: {spell.name}</h3>
                <h3 className="adventurerLevel">Level: {spell.level}</h3>
                <h3 className="adventurerClass">Purpose: {spell.purpose}</h3>
            </div>
        );
    });
    
    return (
    <div className="spellList">
        {spellNodes}
    </div>
    );
};



const loadSpellsFromServer = (csrf) => {
    sendAjax('GET', '/getSpells', null, (data) => {
        ReactDOM.render(
            <SpellList spells={data.spell} csrf={csrf} />, document.querySelector("#data")
        );
    });
};


const createSpellWindow = (csrf) => {
    ReactDOM.render(
        <SpellForm csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <SpellList spells={[]} csrf={csrf}/>, document.querySelector("#data")
    );
    
    loadSpellsFromServer(csrf);
}

const WeaponForm = (props) => {
    return (
    <form id="weaponForm" 
        onSubmit={handleWeapon}
        name="weaponForm"
        action="/weaponMaker"
        method="POST"
        className="weaponForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="weaponName" type="text" name="name" placeholder="Weapon Name"/>
    <label htmlFor="type">Type: </label>
    <input id="weaponType" type="text" name="type" placeholder="Weapon Type"/>
    <label htmlFor="rarity">Rarity(1-10): </label>
    <input id="weaponRarity" type="text" name="rarity" placeholder="Weapon Rarity"/>
    <label htmlFor="damage">Damage(Up to 2x Rarity): </label>
    <input id="weaponDamage" type="text" name="damage" placeholder="Weapon Damage"/>
    <label htmlFor="description">Description: </label>
    <input id="weaponDescription" type="text" name="description" placeholder="Weapon Description"/>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeWeaponSubmit" type="submit" value="Make Weapon" />
    </form>
    );
};

const WeaponList = function(props) {
    if(props.weapons.length === 0) {
        return (
            <div className="weaponList">
                <h3 className="empty">No Weapons created yet</h3>
            </div>
        );
    }
    
    const weaponNodes = props.weapons.map(function(weapon) {
        console.dir(weapon.description);
        return (
            <div data-key={weapon._id} className="adventurer">
                <img src="/assets/img/weaponIcon.png" alt="adventurer face" className="adventurerFace" />
                <h3 className="weaponName">Name: {weapon.name}</h3>
                <h3 className="weaponType">Type: {weapon.type}</h3>
                <h3 className="weaponRarity">Rarity: {weapon.rarity}</h3>
                <h3 className="weaponDamage">Damage: {weapon.damage}</h3>
                <h3 className="weaponDescription">Description: {weapon.description}</h3>
            </div>
        );
    });
    
    return (
    <div className="weaponList">
        {weaponNodes}
    </div>
    );
};



const loadWeaponsFromServer = (csrf) => {
    sendAjax('GET', '/getWeapons', null, (data) => {
        ReactDOM.render(
            <WeaponList weapons={data.weapon} csrf={csrf} />, document.querySelector("#data")
        );
    });
};


const createWeaponWindow = (csrf) => {
    ReactDOM.render(
        <WeaponForm csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <WeaponList weapons={[]} csrf={csrf}/>, document.querySelector("#data")
    );
    
    loadWeaponsFromServer(csrf);
}

const EmptyForm = (props) => {
    return(null);
};

const PasswordWindow = (props) => {
    return (
    <form id="passwordForm" 
        name="passwordForm"
        onSubmit={handlePassword}
        action="/passwordChange"
        method="POST"
        className="mainForm"
    >
    <label for="pass">New Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password"/>
    <label for="pass2">New Password Again: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
    <input type="hidden" name="_csrf" value={props.csrf}/>
    <input className="formSubmit" type="submit" value="Sign Up" />
    </form>
    );
};

const createPasswordWindow = (csrf) => {
    ReactDOM.render(
    <EmptyForm />,
    document.querySelector("#make")
    );
    
    ReactDOM.render(
    <PasswordWindow csrf={csrf} />,
    document.querySelector("#data")
    );
};


const BarracksForm = (props) => {
    return (
    <form id="barracksForm" 
        onSubmit={handleBarracks}
        name="barracksForm"
        action="/goOnMission"
        method="POST"
        className="barracksForm"
    >
    <label htmlFor="adventurer">Adventurer: </label>
    <AdventurerContent adventurers={props.adventurers}></AdventurerContent>
    <label htmlFor="weapon">Weapon: </label>
    <WeaponContent weapons={props.weapons}></WeaponContent>
    <label htmlFor="spell">Spell: </label>
    <SpellContent spells={props.spells}></SpellContent>
    <label htmlFor="mission">Mission: </label>
    <MissionContent missions={props.missions}></MissionContent>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="goAdventureSubmit" type="submit" value="Go Adventure" />
    </form>
    );
};

const AdventurerContent = function(props){
    if(props.adventurers.length === 0) {
        return (
            <select id="adventurerSelect" type="text" name="adventurer">
                <option>No Adventurers</option>
            </select>
        );
    }
    
    const adventurerOptions = props.adventurers.map(function(adventurer) {
        return (
            <option value={JSON.stringify(adventurer)}>{adventurer.name}</option>
        );
    });
    
    return (
        <select id="adventurerSelect" type="text" name="adventurer">
            {adventurerOptions}
        </select>
    );
};

const WeaponContent = function(props){
    if(props.weapons.length === 0) {
        return (
            <select id="weapon" type="text" name="weapon">
                <option>No Weapons</option>
            </select>
        );
    }
    
    const weaponOptions = props.weapons.map(function(weapon) {
        return (
            <option value={JSON.stringify(weapon)}>{weapon.name}</option>
        );
    });
    
    return (
        <select id="weapon" type="text" name="weapon">
            {weaponOptions}
        </select>
    );
};


const SpellContent = function(props){
    if(props.spells.length === 0) {
        return (
            <select id="spell" type="text" name="spell">
                <option>No Spells</option>
            </select>
        );
    }
    
    const spellOptions = props.spells.map(function(spell) {
        return (
            <option value={JSON.stringify(spell)}>{spell.name}</option>
        );
    });
    
    return (
        <select id="spell" type="text" name="spell">
            {spellOptions}
        </select>
    );
};

const MissionContent = function(props){
    console.dir(props);
    if(props.missions.length === 0) {
        return (
            <select id="mission" type="text" name="mission">
                <option>No Missions</option>
            </select>
        );
    }
    
    const missionOptions = props.missions.map(function(mission) {
        return (
            <option value={JSON.stringify(mission)}>{mission.title}</option>
        );
    });
    
    return (
        <select id="mission" type="text" name="mission">
            {missionOptions}
        </select>
    );
};


const loadInfoToBarracks = (csrf) => {
    var advents = [];
    var weps = [];
    var sps = [];
    var miss = [];
    
    sendAjax('GET', '/getAdventurers', null, (data) => {
        advents = data.adventurer;
        renderBarracks(csrf, advents, sps, weps, miss);
    });
    
    sendAjax('GET', '/getWeapons', null, (data) => {
        weps = data.weapon;
        renderBarracks(csrf, advents, sps, weps, miss);
    });
    
    sendAjax('GET', '/getSpells', null, (data) => {
        sps = data.spell;
        renderBarracks(csrf, advents, sps, weps, miss);
    });
    
    sendAjax('GET', '/getMissions', null, (data) => {
        console.dir(data);
        miss = data.mission;
        renderBarracks(csrf, advents, sps, weps, miss);
    });
};

const renderBarracks = (csrf, advents, sps, weps, miss) => {
    ReactDOM.render(
        <BarracksForm adventurers={advents} spells={sps} weapons={weps} missions={miss} csrf={csrf} />, document.querySelector("#make")
    );
        
    ReactDOM.render(
        <EmptyList />, document.querySelector("#data")
    );
};

const displayMissionResult = (csrf) => {
    sendAjax('GET', '/updateBarracksMessage', null, (data) => {
        if(data.mission.status === "success"){
            const send = {
                adventurer: document.querySelector("#adventurerSelect").value,
                _csrf: csrf,
            };
            sendAjax('POST', "/level", send, function(){
            });
            ReactDOM.render(
                <ResultMessage result="success" />, document.querySelector("#data")
            );
        } else{
            ReactDOM.render(
                <ResultMessage result="failure" />, document.querySelector("#data")
            );
        }
    });
}

const EmptyList = (props) => {
    return(null);
};

const ResultMessage = (props) =>{
    if(props.result === "success"){
        return (
            <div className="weaponList">
                <h3 className="empty">Mission Was A Success</h3>
            </div>
        );
    } else {
        return (
            <div className="weaponList">
                <h3 className="empty">Mission Was A Failure</h3>
            </div>
        );
    }
}


const createBarracksWindow = (csrf) => {
    ReactDOM.render(
        <BarracksForm adventurers={[]} weapons={[]} spells={[]} missions={[]} csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <EmptyList />, document.querySelector("#data")
    );
    
    loadInfoToBarracks(csrf);
};


const MissionForm = (props) => {
    return (
    <form id="missionForm" 
        onSubmit={handleMission}
        name="missionForm"
        action="/missionMaker"
        method="POST"
        className="missionForm"
    >
    <label htmlFor="title">Title: </label>
    <input id="missionTitle" type="text" name="title" placeholder="Mission Title"/>
    <label htmlFor="difficulty">Difficulty: </label>
    <input id="missionDifficulty" type="text" name="difficulty" placeholder="Mission Difficulty"/>
    <label htmlFor="type">Type: </label>
    <select id="missionType" name="type">
         <option value="Extermination">Extermination</option>
         <option value="Diplomatic">Diplomatic</option>  
        <option value="Reasearch">Reasearch</option>  
        <option value="Assassination">Assassination</option>  
        <option value="Exploration">Exploration</option>
        <option value="Trade">Trade</option>
        <option value="Thievery">Thievery</option>
    </select>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeMissionSubmit" type="submit" value="Create Mission" />
    </form>
    );
};

const MissionList = function(props) {
    console.dir(props);
    if(props.missions.length === 0) {
        return (
            <div className="missionList">
                <h3 className="empty">No Missions created yet</h3>
            </div>
        );
    }
    
    const missionNodes = props.missions.map(function(mission) {
        return (
            <div data-key={mission._id} className="adventurer">
                <img src="/assets/img/missionIcon.png" alt="mission icon" className="adventurerFace" />
                <h3 className="adventurerName">Title: {mission.title}</h3>
                <h3 className="adventurerLevel">Difficulty: {mission.difficulty}</h3>
                <h3 className="adventurerClass">Type: {mission.type}</h3>
            </div>
        );
    });
    
    return (
    <div className="missionList">
        {missionNodes}
    </div>
    );
};



const loadMissionsFromServer = (csrf) => {
    sendAjax('GET', '/getMissions', null, (data) => {
        ReactDOM.render(
            <MissionList missions={data.mission} csrf={csrf} />, document.querySelector("#data")
        );
    });
};


const createMissionsWindow = (csrf) => {
    ReactDOM.render(
        <MissionForm csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <MissionList missions={[]} csrf={csrf}/>, document.querySelector("#data")
    );
    
    loadMissionsFromServer(csrf);
}


const setup = function(csrf) {
    
    token = csrf;
    
    const adventurerButton = document.querySelector("#adventurerButton");
    const spellButton = document.querySelector("#spellButton");
    const weaponButton = document.querySelector("#weaponButton");
    const passwordButton = document.querySelector("#passwordButton");
    const barracksButton = document.querySelector("#barracksButton");
    const missionsButton = document.querySelector('#missionsButton');
    
    adventurerButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAdventurerWindow(csrf);
        return false;
    });
    
    spellButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSpellWindow(csrf);
        return false;
    });
    
    weaponButton.addEventListener("click", (e) => {
        e.preventDefault();
        createWeaponWindow(csrf);
        return false;
    });
    
    passwordButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });
    
    barracksButton.addEventListener("click", (e) => {
        e.preventDefault();
        createBarracksWindow(csrf);
        return false;
    });
    
    missionsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createMissionsWindow(csrf);
        return false;
    });
    
    createAdventurerWindow(csrf); 
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
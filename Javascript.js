var roles = {
    INVESTIGATOR: "TI",
    LOOKOUT: "TI",
    SHERIFF: "TI",
    SPY: "TI",
    JAILOR: "J",
    VETERAN: "TK",
    VIGILANTE: "TK",
    BODYGUARD: "TP",
    DOCTOR: "TP",
    ESCORT: "TS",
    MAYOR: "TS",
    MEDIUM: "TS",
    RETRIBUTIONIST: "TS",
    TRANSPORTER: "TS",
    DISGUISER: "MAF",
    FORGER: "MAF",
    FRAMER: "MAF",
    JANITOR: "MAF",
    GODFATHER: "MAF",
    MAFIOSO: "MAF",
    BLACKMAILER: "MAF",
    CONSIGLIERE: "MAF",
    CONSORT: "MAF",
    EXECUTIONER: "NE",
    JESTER: "NE",
    WITCH: "NE",
    ARSONIST: "NK",
    SERIAL_KILLER: "NK",
    WITCH: "NK"
};

var gameRoles = {
    J: 1,
    TI: 2,
    TP: 1,
    TK: 1,
    TS: 1,
    RT: 3,
    MAF: 4,
    NE: 1,
    NK: 1
}

var prettyPrint = {
    J: "Jailor",
    TI: "Town Investigative",
    TP: "Town Protective",
    TK: "Town Killing",
    TS: "Town Support",
    RT: "Random Town",
    MAF: "Mafia",
    NE: "Neutral Evil",
    NK: "Neutral Killing"
}

function generateResultsTable() {
    $('#resultsTable tr').not(":eq(0)").remove();
    var availableRoles = gameRoles;
    $('#mainTable tr').has(':checkbox:checked').each(function() {
        var player = $(this).find('.player').val();
        var role = $(this).find('.role').val();
        var type = roles[role];
        
        if (availableRoles[type] < 1 && (type == 'TI' || type == 'TK' || type == 'TP' || type == 'TS')) {
            type = 'RT';
        }
        
        availableRoles[type] -= 1;
        $('#resultsTable').append('<tr><td>' + prettyPrint[type] + '</td><td>' + player + '</td></tr>');
    });
    $('#mainTable tr').has(':checkbox:not(:checked)').each(function() {

    });
}

$(document).ready(function(){
    for (i = 0; i < 16; i++) {
        $('#mainTable').append('<tr><td><input class="player" type="text"></td><td><select class="role"><option /></select></td><td><input class="confirmed" type="checkbox"></td></tr>')
    }
    
    for (let role in roles) {
        $('.role').append('<option value="' + role + '">' + role + '</option>');
    }
    
    $('.role, .confirmed').change(function() {
        generateResultsTable();
    });
});
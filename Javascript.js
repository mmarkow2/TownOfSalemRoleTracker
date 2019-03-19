var roles = {
    Investigator: "TI",
    Lookout: "TI",
    Sheriff: "TI",
    Spy: "TI",
    Jailor: "J",
    Veteran: "TK",
    Vigilante: "TK",
    Bodyguard: "TP",
    Doctor: "TP",
    Escort: "TS",
    Mayor: "TS",
    Medium: "TS",
    Retributionist: "TS",
    Transporter: "TS",
    Disguiser: "MAF",
    Forger: "MAF",
    Framer: "MAF",
    Janitor: "MAF",
    Godfather: "MAF",
    Mafioso: "MAF",
    Blackmailer: "MAF",
    Consigliere: "MAF",
    Consort: "MAF",
    Executioner: "NE",
    Jester: "NE",
    Witch: "NE",
    Arsonist: "NK",
    Serial_Killer: "NK",
    Werewolf: "NK"
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
};

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
};

function generateRoleCounts() {
    var result = new Object();
    for (let gameRole in gameRoles) {
        result[gameRole] = gameRoles[gameRole];
    }
    
    return result;
}

function generateResultsTable() {
    var availableRoles = generateRoleCounts();
    $('.roleResult').text('');
    $('#mainTable tr').has('.confirmed:checked').each(function() {
        var player = $(this).find('.player').val();
        var role = $(this).find('.role').val();
        var type = roles[role];
        
        if (availableRoles[type] < 1 && (type == 'TI' || type == 'TK' || type == 'TP' || type == 'TS')) {
            type = 'RT';
        }
        
        //if there is a conflict
        if (availableRoles[type] < 1) {
            $('#' + type + '0').append(' - <span class="verifiedSpan">' + player + ' (' + role + ')</span>');
        }
        else {
            var selector = $('#' + type + (gameRoles[type] - availableRoles[type]));
            selector.html('<span class="verifiedSpan">' + player + ' (' + role + ')</span>');
            
            if ($(this).find('.dead').prop('checked')) {
                selector.parent().css('background-color', 'rgba(255, 0, 0, 0.5)');
            }
            else {
                selector.parent().css('background-color', 'white');
            }
            
            availableRoles[type] -= 1;
        }
    });
    $('#mainTable tr').has('.confirmed:not(:checked)').each(function() {
        var player = $(this).find('.player').val();
        var role = $(this).find('.role').val();
        var type = roles[role];
        
        if (availableRoles[type] < 1 && (type == 'TI' || type == 'TK' || type == 'TP' || type == 'TS')) {
            type = 'RT';
        }
        
        //if there is a conflict
        if (availableRoles[type] < 1) {
            $('#' + type + '0').append(' - <span class="unverifiedSpan">' + player + ' (' + role + ')</span>');
        }
        else {
            $('#' + type + (gameRoles[type] - availableRoles[type])).html('<span class="unverifiedSpan">' + player + ' (' + role + ')</span>');
            availableRoles[type] -= 1;
        }
    });
}

$(document).ready(function(){
    for (i = 0; i < 15; i++) {
        $('#mainTable').append('<tr><td>' + (i + 1) + '</td><td><input class="player" type="text" tabindex=' + (i + 1) + '></td><td><select class="role"><option /></select></td><td><input class="confirmed" type="checkbox"></td><td><input class="dead" type="checkbox"></td></tr>')
    }
    
    for (let role in roles) {
        $('.role').append('<option value="' + role + '">' + role + '</option>');
    }
    
    //generate initial results table
    for (let role in gameRoles) {
        for (i = 0; i < gameRoles[role]; i++) {
            $('#resultsTable').append('<tr><td>' + prettyPrint[role] + '</td><td id="' + role + i + '" class="roleResult"></td></tr>');
        }
    }
    
    $('.dead').change(function() {
        var selector = $(this).parent().parent().find('.confirmed');
        if ($(this).prop('checked')) {
            selector.prop('checked', true);
            selector.prop('disabled', true);
        }
        else {
            selector.prop('disabled', false);
        }
    });
    
    $('.role, .confirmed, .dead').change(function() {
        generateResultsTable();
        $('#unclaimedTable').find('tr:not(:first)').remove();
        $('#mainTable tr').filter(function() {
            return $(this).find('.role').val() == '';
        }).each(function(index) {
            $('#unclaimedTable').append('<tr><td>' + $(this).find('.player').val() + '</td></tr>');
        });
    });
});
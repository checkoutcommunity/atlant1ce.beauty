$(() => {
    let searchInput = $('#search-input');
    let searchDropdown = $('#search-dropdown');

    searchDropdown.empty();

    $('#search-dropdown.dropdown-item').click(function () {
        console.debug($(this).attr('href'));
    });

    searchInput.focusin(function () {
        searchDropdown.addClass('show');
    });

    searchInput.focusout(function () {
        setTimeout(() => {
            searchDropdown.removeClass('show');
        }, 200);
    });

    $('#search-button').click(function () {
        searchDropdown.toggleClass('show');
    });

    $('#loginDropdown').click(function (e) {
        e.preventDefault();
    });

    function appendUser(element) {
        searchDropdown.append(`
                        <a class="dropdown-item" href="${element.url}">
                            <span style="color: #000000">${element.username}</span> <img class="float-right" src="${element.image}" alt="${element.username}">
                        </a>
                        `)
    }

    let lastSearch;

    setInterval(() => {
        let text = searchInput.val();
        if (!text || (text && text.length <= 1)) return;
        if (lastSearch !== text) {
            search(text);
            lastSearch = text;
        }
    }, 300);

    function search(text) {
        $.get({
            url: `/search/${text}`,
            dataType: 'json',
            cache: true,
            success: (res) => {
                if (text !== lastSearch) return;
                let dropDown = $('#search-dropdown');
                dropDown.empty();
                if (res.status === 'success') {
                    res.response.forEach(element => {
                        appendUser(element)
                    });

                    searchDropdown.addClass('show');
                }
            },
            error: () => console.error('error searching')
        });
    }
});
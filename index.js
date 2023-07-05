function toggleDropdown(event, dropdownId) {
    event.preventDefault();
    const dropdownContent = document.getElementById(dropdownId);
    const dropdown = dropdownContent.parentElement;
    const isActive = dropdown.classList.contains('active');

    if (!isActive) {
        dropdown.classList.add('active');
    } else {
        dropdown.classList.remove('active');
    }
}
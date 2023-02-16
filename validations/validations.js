const fromIsValid = (from) => {
    if (from.length < 3) {
        return false;
    }
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(from)) {
        return false;
    }
    return true;
};

const toIsValid = (to) => {
    const regex = /\+?^[0-9]+$/;
    if (!regex.test(to)) {
        return false;
    }
    return true;
};

const messageIsValid = (message) => {
    if (message.length < 5) {
        return false;
    }
    const regex = /^\S{5,}$/;

    if (!regex.test(message)) {
        return false;
    }

    return true;
};

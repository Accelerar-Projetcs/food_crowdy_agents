export default (theme) => ({
    typograghy: {
        margin: theme.spacing(0.5)
    },
    header: {
        margin: theme.spacing(2, 0.5)
    },
    textField2: {
        margin: theme.spacing(1.5, 0.4)
    },
    ul: {
        margin: theme.spacing(2, 0.4),
        '& li': {
            lisStyleType: 'none',
            margin: theme.spacing(.7, 0.4),
        }
    },
    form: {
        margin: theme.spacing(1)
    }
});

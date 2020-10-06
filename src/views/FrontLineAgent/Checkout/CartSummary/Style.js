
export default (theme) => {
    return {
        root: {
            // flexGrow: 1,
            // maxWidth: 752,
        },
        demo: {
            // margin: theme.spacing(2, 1),
        },
        title: {
            margin: theme.spacing(4, 0, 2),
            textTransform: 'capitalize',
        },
        unitPrice: {
            margin: theme.spacing(1.6, 0.5, -4.6, 0.5),
            color: theme.palette.black,
            fontWeight: "600",
        },
        btn: {
            margin: theme.spacing(1, 0)
        },
        paper: {
            margin: theme.spacing(2, 'auto')
        }
    };
};

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        indent: ['error', 4, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
        'template-curly-spacing': 'off',
        'no-unused-vars': ['warn'],
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                mocha: true,
            },
        },
    ],
};

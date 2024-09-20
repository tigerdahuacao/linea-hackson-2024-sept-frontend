/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    env: { browser: true, es2024: true },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        // React启用jsx
        ecmaFeatures: {
            jsx: true,
        },
    },
    ignorePatterns: [
        // Ignore dotfiles
        'node_modules/',
        'dist/',
    ],
    extends: [
        // airbnb规范
        // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
        'airbnb',
        // 兼容typescript的airbnb规范
        // https://github.com/iamturns/eslint-config-airbnb-typescript
        'airbnb-typescript',
        // react hooks的airbnb规范
        'airbnb/hooks',
        // typescript的eslint插件
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // 使用prettier格式化代码
        // https://github.com/prettier/eslint-config-prettier#readme
        'prettier',
        // 整合typescript-eslint与prettier
        // https://github.com/prettier/eslint-plugin-prettier
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react-refresh', 'import', 'unused-imports', 'prettier'],
    rules: {
        /* ********************************** ES6+ ********************************** */
        'no-console': 0,
        'no-var-requires': 0,
        'no-restricted-syntax': 0,
        'no-continue': 0,
        'no-await-in-loop': 0,
        'no-return-await': 0,
        'no-unused-vars': 0,
        'no-multi-assign': 0,
        'no-param-reassign': [2, { props: false }],
        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'import/no-dynamic-require': 0,
        'max-classes-per-file': 0,
        'class-methods-use-this': 0,
        'guard-for-in': 0,
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'no-lonely-if': 0,
        'no-bitwise': ['error', { allow: ['~'] }],

        /* ********************************** Module Import ********************************** */

        'import/no-absolute-path': 0,
        'import/extensions': 0,
        'import/no-named-default': 0,
        'no-restricted-exports': 0,
        'import/no-extraneous-dependencies': 0,
        // 模块导入顺序规则
        'import/order': [
            1,
            {
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                alphabetize: { order: 'asc', caseInsensitive: false },
                'newlines-between': 'always-and-inside-groups',
                warnOnUnassignedImports: true,
            },
        ],
        // 自动删除未使用的导入
        // https://github.com/sweepline/eslint-plugin-unused-imports
        'unused-imports/no-unused-imports': 1,
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],

        /* ********************************** Typescript ********************************** */
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-unnecessary-type-assertion': 0,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/no-for-in-array': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/lines-between-class-members': 0,
        '@typescript-eslint/no-throw-literal': 0,

        /* ********************************** React and Hooks ********************************** */
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
        'react/jsx-no-useless-fragment': 0,
        'react/display-name': 0,
        'react/button-has-type': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'react/destructuring-assignment': 0,
        'react/static-property-placement': 0,
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/function-component-definition': 0,
        'react-hooks/exhaustive-deps': 0,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

        /* ********************************** jax-a11y ********************************** */
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
    },
};

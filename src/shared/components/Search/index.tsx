import React, {useState, useRef, useCallback} from 'react';
import clsx from 'clsx';
import {Box, IconButton, FormControl, Input, Tooltip} from '@material-ui/core';
import {Search, Close} from '@material-ui/icons';
import {useStyles} from './styles';

export interface Props {
  onChange: (value?: string | undefined | null) => void;
  searchValue?: string | null | undefined;
  placeholder?: string;
}

function Card({onChange, searchValue, placeholder}: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const mySearchInput = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const handleSearch = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange],
  );

  const handleCloseSearch = useCallback(() => {
    if (mySearchInput?.current?.value.length) {
      mySearchInput.current.value = '';
      handleSearch('');
    } else {
      setIsSearchOpen(false);
    }
  }, [handleSearch]);

  return (
    <Box className={classes.actionList} textAlign="right" display="flex" alignItems="center">
      <span className={classes.searchWrapper}>
        <FormControl
          size="small"
          variant="filled"
          className={clsx(classes.searchControl, isSearchOpen ? 'opened' : 'closed', 'left')}
        >
          <IconButton
            aria-label="search control"
            className={classes.inputSearchIcon}
            disabled
            onClick={() => onChange(searchValue)}
          >
            <Search />
          </IconButton>
          <Input
            id="search-control"
            inputRef={mySearchInput}
            type="search"
            className={classes.searchField}
            placeholder={placeholder || 'Search'}
            value={searchValue}
            inputProps={{
              autoFocus: true,
              className: classes.input,
            }}
            onChange={e => handleSearch(e.target.value)}
          />
          <IconButton
            aria-label="search control"
            className={classes.closeIcon}
            onClick={() => handleCloseSearch()}
          >
            <Close fontSize="small" />
          </IconButton>
        </FormControl>
        <Tooltip title="Search">
          <IconButton
            size="small"
            className={clsx(classes.searchIcon, isSearchOpen ? 'hidden' : 'visible')}
            onClick={() => {
              setTimeout(() => {
                mySearchInput.current?.focus();
              }, 200);
              setIsSearchOpen(true);
            }}
          >
            <Search />
          </IconButton>
        </Tooltip>
      </span>
    </Box>
  );
}

export default Card;

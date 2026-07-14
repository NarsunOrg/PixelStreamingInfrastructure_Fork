# Cirrus to Wilbur Guide

This is just a small brief to describe the differences between the now deprecated `cirrus` signalling server and the new `wilbur` signalling server.

- Configuration is handled by CLI options or the same options in a `config.json`
- By default this server does not host static frontend content.
- Use `--https` to enable HTTPS and `--rest_api` to expose REST API routes.
- Messages are now described by protobufs in the [Common](../Common/protobuf/signalling_messages.proto) library.
- The server is built on top of the [Common](../Common) library which is provided as a tool for developers to build their own applications.
- Logs from `wilbur` are now structured JSON so they can be easily ingested into external tools.
- Messages sent and received are no longer echoed to the terminal by default. The `--console_messages` argument can control this behaviour.
- The `config.json` file will not be created or recreated (if deleted), if you want the config.json to be generated based on current arguments use `--save`.

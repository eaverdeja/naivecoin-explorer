import { PluginBase } from 'terminal-in-react'

/**
 * Made by mixing insights from these two links:
 * For the terminal-in-react plugin requirements and usage
 *  - https://github.com/nitin42/terminal-in-react/issues/35#issuecomment-325075710
 * For the Apollo subscriptions part:
 *  - https://www.apollographql.com/docs/react/advanced/subscriptions.html#subscribe-to-more
 *
 */
export default class ApolloSubscriptionPlugin extends PluginBase {
  static displayName = 'An Apollo Subscription plugin for React Terminal'
  static version = '1.0.0'

  constructor(api, config = {}) {
    super(api)
    //We pass the printLine function so the client
    //can use it to boot up and print the initial results
    //from the query
    if (typeof config.boot === 'function') {
      config.boot(this.printLine)
    }
    //We subscribe to more results by passing a subscribe function
    //that takes in a GraphQL subscription (template string),
    //a key for extracting the desired data and the
    //subscribeToMore function provided by
    //Apollo's <Query> component
    if (typeof config.more === 'function') {
      config.more(this.subscribe)
    } else {
      console.warn(
        "ApolloSubscriptionPlugin is being used without a more() function configured. Are you sure that's right?"
      )
    }
  }

  subscribe = (document, key, subscribeToMore) => {
    subscribeToMore({
      document,
      updateQuery: (prev, { subscriptionData }) => {
        this.printLine(subscriptionData.data[key])
        //Since we have access to the terminals API by means
        //of this.api.printLine(), we can just return the old state
        return prev
      }
    })
  }

  printLine = res => {
    this.api.printLine(res)
  }
}

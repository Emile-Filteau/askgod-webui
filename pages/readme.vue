<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="headline">README</h1>
        <v-alert
          outlined
          type="info"
          text
        >
          From now on, this is your <em>.config/</em> for the next 48 hours. You will find all the information you need about the infrastructure and challenges.
        </v-alert>
        <h2 class="title">Code of Conduct</h2>
        <p>By participating to the NSEC CTF, you agree to uphold our <a href="https://www.nsec.io/code-of-conduct/">Code of Conduct</a>.</p>
        <h2 class="title">Rules</h2>
        <ol>
          <li><em>DO NOT</em> attack other teams</li>
          <li><em>DO NOT</em> attack the scoring system (<a href="https://askgod.nsec/">ask-god</a>)</li>
          <li><em>DO NOT</em> attack anything outside of <code>*.ctf</code> or <code>9000::/16</code></li>
          <li><em>DO NOT</em> steal or/and exchange flags between teams</li>
          <li><em>DO NOT</em> not submit this flag</li>
        </ol>
        <p>NSEC staff will have the last word on any issues. Any violations can disqualify your team and you could be asked to leave the premises.</p>
        <h2 class="title">Infrastructure</h2>
        <h3 class="subtitle-2">CA Certificate</h3>
        <p>Each <code>.nsec</code> site forces TLS and is signed by our <a href="https://www.nsec/ca.crt">CA certificat</a>  that you should install in your browser if you want. This certificate is only used to sign <code>*.nsec</code> domains. If you don't trust it, you can refer to <a href="https://nsec.io/802.1x/nsec-certs.txt">this page</a> to get the fingerprint of all sites. If you choose this method, you need to visit all the URLs and accept the certificates manually, otherwise some sites might not work for you.</p>
        <h3 class="subtitle-2">DNS Servers</h3>
        <ul>
          <li><code>2001:470:b2b5:1020:216:3eff:fe3a:24fb</code></li>
          <li><code>2001:470:b2b5:1020:216:3eff:fe17:15cb</code></li>
        </ul>
        <h3 class="subtitle-2">Slack Server</h3>
        <ul>
          <li><a href="https://northsec.slack.com/">NorthSec Slack</a></li>
          <li><a href="https://northsec-slack-signup.herokuapp.com/">Heroku</a></li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>
